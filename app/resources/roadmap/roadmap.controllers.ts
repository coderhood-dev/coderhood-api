import { crudControllers } from '../../utils/crud';
import roadmapModel from './roadmap.model';
import topicModel from '../topic/topic.model';

export const getRoadmap = async (req: any, res: any) => {
  try {
    const roadmap = await roadmapModel
      .findOne({ name: req.params.name })
      .lean()
      .exec();

    if (!roadmap) {
      return res.status(400).end();
    }

    const topic = await topicModel.find({ roadmap: roadmap._id }).lean().exec();

    if (!topic) {
      return res.status(400).end();
    }

    res.status(200).json({ ...roadmap, topic });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  ...crudControllers(roadmapModel),
  getRoadmap,
};
