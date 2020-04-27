import { Router } from 'express';
import roadmapControllers from './roadmap.controllers';

const router = Router();

// /roadmaps
router.route('/').get(roadmapControllers.getMany);

// /roadmaps/:name
router.route('/:name').get(roadmapControllers.getRoadmap);

export default router;
