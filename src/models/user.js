import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';

const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true
    },
    password: String,
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      id: this._id,
      isAdmin: this.isAdmin
    },
    config.JwtKey,
    { expiresIn: '2 days' }
  );
  return token;
};

export default mongoose.model('User', userSchema);
