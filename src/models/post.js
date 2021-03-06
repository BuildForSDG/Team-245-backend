import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = Schema(
  {
    title: String,
    Description: String,
    imgUrl: String,
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
