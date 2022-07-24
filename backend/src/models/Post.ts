import { Document, model, Schema } from 'mongoose';

interface IPost {
  userId: string;
  description?: string;
  image?: string;
  likes?: string[];
}

interface PostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 200,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model<PostDocument>('Post', postSchema);

export default Post;
