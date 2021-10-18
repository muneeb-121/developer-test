import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    dob: Date,
    address: String,
    description: String,
  },
  {
    timestamps: true,
  },
);
