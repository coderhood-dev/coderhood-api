import { crudControllers } from '../../utils/crud';
import roadmapModel from './roadmap.model';
import subjectModel from '../subject/subject.model';

export const getRoadmap = async (req: any, res: any) => {
  try {
    const roadmap = await roadmapModel
      .findOne({ name: req.params.name })
      .lean()
      .exec();

    if (!roadmap) {
      return res.status(400).end();
    }

    const subjects = await subjectModel
      .find({ roadmap: roadmap._id })
      .lean()
      .exec();

    if (!subjects) {
      return res.status(400).end();
    }

    const data = {
      ...roadmap,
      subjects,
    };
    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  ...crudControllers(roadmapModel),
  getRoadmap,
};
