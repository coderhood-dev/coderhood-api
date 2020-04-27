import mongoose from 'mongoose';

export const createOneFromUser = (
  model: mongoose.Model<mongoose.Document, {}>
) => async (req: any, res: any) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getOneFromUser = (
  model: mongoose.Model<mongoose.Document, {}>
) => async (req: any, res: any) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getManyFromUser = (
  model: mongoose.Model<mongoose.Document, {}>
) => async (req: any, res: any) => {
  try {
    const docs = await model.find({ createdBy: req.user._id }).lean().exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOneFromUser = (
  model: mongoose.Model<mongoose.Document, {}>
) => async (req: any, res: any) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOneFromUser = (
  model: mongoose.Model<mongoose.Document, {}>
) => async (req: any, res: any) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = (model: mongoose.Model<mongoose.Document, {}>) => async (
  _: any,
  res: any
) => {
  try {
    const docs = await model.find({}).lean().exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getOne = (model: mongoose.Model<mongoose.Document, {}>) => async (
  req: any,
  res: any
) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const crudControllers = (model: mongoose.Model<mongoose.Document>) => ({
  createOneFromUser: createOneFromUser(model),
  getOneFromUser: getOneFromUser(model),
  getManyFromUser: getManyFromUser(model),
  updateOneFromUser: updateOneFromUser(model),
  removeOneFromUser: removeOneFromUser(model),

  getMany: getMany(model),
  getOne: getOne(model),
});
