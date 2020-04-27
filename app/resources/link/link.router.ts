import { Router } from 'express';
import linkControllers from './link.controllers';

const router = Router();

// /links
router
  .route('/')
  .get(linkControllers.getManyFromUser)
  .post(linkControllers.createOneFromUser);

// /links/:id
router
  .route('/:id')
  .put(linkControllers.updateOneFromUser)
  .delete(linkControllers.removeOneFromUser);

export default router;
