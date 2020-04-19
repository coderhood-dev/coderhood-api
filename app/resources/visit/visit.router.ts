import { Router } from 'express';
import { getCount } from './visit.controllers';

const router = Router();

router.get('/', getCount);

export default router;
