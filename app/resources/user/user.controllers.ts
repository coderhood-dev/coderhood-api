import { Console } from "console";
import { decode } from "punycode";
import {promisify} from 'util';

// const AWS = require('aws-sdk');
// const CognitoUserPool = require('amazon-cognito-identity-js').CognitoUserPool;
// const CognitoUserSession = require('amazon-cognito-identity-js').CognitoUserSession;
// const CognitoUser = require('amazon-cognito-identity-js').CognitoUser;
// const CognitoIdToken = require('amazon-cognito-identity-js').CognitoIdToken;
// const CognitoAccessToken = require('amazon-cognito-identity-js').CognitoAccessToken;
// const CognitoRefreshToken = require('amazon-cognito-identity-js').CognitoRefreshToken;
// const AuthenticationDetails = require('amazon-cognito-identity-js').AuthenticationDetails

import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

const COGNITO_IDENTITY_POOL_ID = process.env.COGNITO_IDENTITY_POOL_ID;
const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const AWS_REGION = process.env.AWS_REGION;

interface TokenHeader {
    kid: string;
    alg: string;
}

interface PublicKey {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
  }
  interface PublicKeyMeta {
    instance: PublicKey;
    pem: string;
  }
  
  interface PublicKeys {
    keys: PublicKey[];
  }

interface MapOfKidToPublicKey {
    [key: string]: PublicKeyMeta;
  }

  interface Claim {
    token_use: string;
    auth_time: number;
    iss: string;
    exp: number;
    username: string;
    client_id: string;
    aud: string;
  }

const cognitoIssuer = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;

let cacheKeys: MapOfKidToPublicKey;

const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await axios.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg: MapOfKidToPublicKey = {}, current: any) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {pem, instance: current};
      return agg;
    });
    return cacheKeys;
  }
    return cacheKeys;
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

export const createUserAuth = async (req: any, res: any) => {
  try {
    console.log(req)
    const token = req.idToken
    console.log(token)
    const tokenSections = (token || '').split('.');
    console.log(tokenSections)
    if (tokenSections.length < 2) {
        return res.status(400).json({
            status: false,
            message: 'Requested token is invalid',
        });
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as TokenHeader;

    const keys = await getPublicKeys();
    
    const key = keys[header.kid];
    if (key === undefined) {
        return res.status(400).json({
            status: false,
            message: 'Claim made for unknown kid',
        });
    }

    const claim = await verifyPromised(token, key.pem) as Claim;

    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        return res.status(400).json({
            status: false,
            message: 'Claim is expired or invalid',
        });
    }
    
    if (claim.iss !== cognitoIssuer) {
        return res.status(400).json({
            status: false,
            message: 'Claim issuer is invalid',
        });
    }
    
    if (claim.token_use !== 'id') {
        return res.status(400).json({
            status: false,
            message: 'Claim use is not type id',
        });
    }

    if (claim.aud !== COGNITO_CLIENT_ID) {
        return res.status(400).json({
            status: false,
            message: 'Token was not issued for this audience',
        });
    }
    
    /*userModel.create({ ...cognitoUser})
        .then(() => {
            const user = userModel.find({ email: cognitoUser.email });
            res.status(200).json({ user })
        })
        .catch(
            res.status(400).end()
        )*/

    return res.status(200).json({
        claim,
        statu: true,
        isValid: true
    })
  } catch (e) {
    console.error(e); 
    res.status(400).end();
  }
};

export default {
  createUserAuth
};
