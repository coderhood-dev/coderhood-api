import { Router } from 'express';
import userControllers from './user.controllers';

const router = Router();

router.route('/createUserAuth').get(userControllers.createUserAuth);

export default router;