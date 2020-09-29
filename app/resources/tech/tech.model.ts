import mongoose from 'mongoose';

const techSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'topic',
        order: Number,
      },
    ],
    links: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'link',
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

export default mongoose.model('tech', techSchema);
