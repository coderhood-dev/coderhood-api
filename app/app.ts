import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import expressFormidable from 'express-formidable';
import adminBro from 'admin-bro';
// @ts-ignore
import adminBroExpressjs from 'admin-bro-expressjs';
// @ts-ignore
import adminBroMongoose from 'admin-bro-mongoose';

adminBro.registerAdapter(adminBroMongoose);

import visitRouter from './resources/visit/visit.router';
import subjectRouter from './resources/subject/subject.router';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(expressFormidable());

app.use('/', visitRouter);
app.use('/subjects', subjectRouter);

export const start = async () => {
  try {
    const mongooseDb = await mongoose.connect(process.env.DB_URL || '', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const bro = new adminBro({
      databases: [mongooseDb],
      branding: {
        companyName: 'Coderhood',
      },
    });

    const router = adminBroExpressjs.buildRouter(bro);
    app.use('/admin', router);

    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
