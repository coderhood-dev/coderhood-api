import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: "URL can't be empty",
      unique: true,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
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

/*linkSchema.path('url').validate((val: string) => {
  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');*/

linkSchema.index({ topic: 1, url: 1 }, { unique: true });

export default mongoose.model('link', linkSchema);
