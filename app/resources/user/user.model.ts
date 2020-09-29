import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    auth_id: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    topics: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'topic',
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

export default mongoose.model('user', userSchema);
