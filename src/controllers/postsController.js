import Post from '../models/Post.js';
import { postValidate } from '../validation/postValidSchema.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateCreated: -1 });
    res
      .status(200)
      .json({ status: 'success', message: 'all posts', data: posts });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: 'success', message: 'internal server error' });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { title, subTitle, postBody, imageUrl } = req.body;
    const { error } = postValidate({ title, subTitle, postBody, imageUrl });

    if (error) {
      return res
        .status(400)
        .json({ status: 'fail', message: error.details[0].message });
    }

    const result = await Post.create({
      title: title,
      subTitle: subTitle,
      postBody: postBody,
      imageUrl: imageUrl,
    });
    res.status(201).json({
      status: 'success',
      message: 'post created',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'fail', error: 'internal server error' });
  }
};
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });

    if (!post)
      return res
        .status(404)
        .json({ status: 'fail', message: 'post not found' });

    res
      .status(200)
      .json({ status: 'success', message: 'post found', data: post });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 'fail', error: `post ${id} not found` });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, subTitle, postBody, imageUrl } = req.body;
    const { error } = postValidate({ title, subTitle, postBody, imageUrl });

    if (error) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Enter valid data' });
    }
    const post = await Post.findOne({ _id: id });

    post.title = title;
    post.subTitle = subTitle;
    post.postBody = postBody;
    post.imageUrl = imageUrl;

    const result = await post.save();
    res
      .status(200)
      .json({ status: 'success', message: 'post updated', data: result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ status: 'fail', message: `post not found` });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete({ _id: id });

    if (!post)
      return res
        .status(404)
        .json({ status: 'fail', message: 'post not found' });
    res.status(200).json({ status: 'success', message: 'post deleted' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 'fail', error: `post not found` });
  }
};
