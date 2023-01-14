import express from "express";
import {createNewPost, deletePost, getAllPosts, getPost, updatePost} from "../../controllers/postsController.js";

const router = express.Router()

router.route('/post')
  .get(getAllPosts)
  .post(createNewPost)

router.route('/post/:id')
  .get(getPost)
  .delete(deletePost)
  .put(updatePost)

export default router
