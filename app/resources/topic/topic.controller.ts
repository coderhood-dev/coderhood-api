import topicModel from './topic.model';

export const createOne = async (req: any, res: any) => {
  try {
    const doc = await topicModel.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (_: any, res: any) => {
  try {
    const docs = await topicModel.find({}).lean().exec();

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  getMany,
  createOne,
};
