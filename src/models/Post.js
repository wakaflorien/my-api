import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [
    {
      name: String,
      comment: String,
      date: String,
    },
  ],
  likes: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('Post', postsSchema);
