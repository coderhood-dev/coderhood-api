const CognitoUserPool = require('amazon-cognito-identity-js-node').CognitoUserPool;
const CognitoUser = require('amazon-cognito-identity-js-node').CognitoUser;

const COGNITO_IDENTITY_POOL_ID = process.env.COGNITO_IDENTITY_POOL_ID;
const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const AWS_REGION = process.env.AWS_REGION;

import userModel from './user.model';

export const createUserAuth = async (req: any, res: any) => {
  try {
    const poolData = { 
        UserPoolId : COGNITO_USER_POOL_ID,
        ClientId : COGNITO_CLIENT_ID
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username : req.user.email, 
        Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    if (!cognitoUser) {
      return res.status(400).end();
    }
    
    userModel.create({ ...cognitoUser})
        .then(() => {
            const user = userModel.find({ email: cognitoUser.email });
            res.status(200).json({ user })
        })
        .catch(
            res.status(400).end()
        )
  } catch (e) {
    console.error(e); 
    res.status(400).end();
  }
};

export default {
  createUserAuth
};
