import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
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

export default mongoose.model('visit', visitSchema);
