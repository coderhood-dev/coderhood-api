import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tech: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tech',
        order: Number,
      },
    ],
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
    timestamps: true,
  }
);

export default mongoose.model('roadmap', roadmapSchema);
