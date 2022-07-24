import { Document, model, Schema } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: string[];
  followings?: string[];
  isAdmin?: boolean;
  description?: string;
  city?: string;
}

interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 70,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const User = model<UserDocument>('User', userSchema);

export default User;
