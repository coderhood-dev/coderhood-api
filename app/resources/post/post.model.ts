import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tag',
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

export default mongoose.model('post', postSchema);
