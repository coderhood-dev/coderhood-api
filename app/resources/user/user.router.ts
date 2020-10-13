import { Router } from 'express';
import userControllers from './user.controllers';

const router = Router();

router.route('/createuser').post(userControllers.createUserAuth);

export default router;