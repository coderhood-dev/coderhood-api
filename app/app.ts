import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

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

app.use('/', visitRouter);
app.use('/subjects', subjectRouter);

export const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
