import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import expressFormidable from 'express-formidable';
// import adminBro from 'admin-bro';
// import adminBroExpressjs from 'admin-bro-expressjs';
// import adminBroMongoose from 'admin-bro-mongoose';

import { checkAuth } from './utils/auth';
import roadmapRouter from './resources/roadmap/roadmap.router';
import linkRouter from './resources/link/link.router';

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

app.use(expressFormidable()); // needed for adminbro

// public routes
app.use('/roadmaps', roadmapRouter);

// protected routes
app.use('/', checkAuth);
app.use('/links', linkRouter);

// adminBro.registerAdapter(adminBroMongoose);

export const start = async () => {
  try {
    const mongooseDb = await mongoose.connect(process.env.DB_URL || '', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // const bro = new adminBro({
    //   databases: [mongooseDb],
    //   branding: {
    //     companyName: 'Coderhood',
    //   },
    // });

    // const router = adminBroExpressjs.buildRouter(bro);
    // app.use('/admin', router);

    app.listen(process.env.PORT, () => {
      console.log(`REST API on ${process.env.PORT}\n`);
    });
  } catch (e) {
    console.error(e);
  }
};
