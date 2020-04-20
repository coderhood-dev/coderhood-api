import subjectModel from './subject.model';

export const createOne = async (req: any, res: any) => {
  try {
    const doc = await subjectModel.create(req.body);
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = async (_: any, res: any) => {
  try {
    const docs = await subjectModel.find({}).lean().exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  getMany,
  createOne,
};
