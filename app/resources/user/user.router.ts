import { Router } from 'express';
import userControllers from './user.controllers';

const router = Router();

router.post('/', userControllers.createUserAuth);

export default router;