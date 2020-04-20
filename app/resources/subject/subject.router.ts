import { Router } from 'express';
import subjectController from './subject.controller';

const router = Router();

router
  .route('/')
  .get(subjectController.getMany)
  .post(subjectController.createOne);

export default router;
