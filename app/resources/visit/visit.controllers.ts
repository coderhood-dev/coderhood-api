import visitModel from './visit.model';

export const getCount = async (_: any, res: any) => {
  const countVisits = () => {
    return new Promise((resolve, reject) => {
      visitModel.countDocuments({}, (e, count) => {
        if (e) {
          reject(e);
        } else {
          resolve(count);
        }
      });
    });
  };

  try {
    await visitModel.create({});
    const count = await countVisits();

    res.status(200).send({ data: { visits: count } });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e });
  }
};

export default {
  getCount,
};
