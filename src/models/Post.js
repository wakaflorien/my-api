import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title:  {
    type: String,
    required: true
  },
  subTitle:  {
    type: String,
    required: true
  },
  postBody: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  dateCreated: { type: Date, default: Date.now },
})

export default mongoose.model('Post', postsSchema)

