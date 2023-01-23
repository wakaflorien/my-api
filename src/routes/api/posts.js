import express from 'express';
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from '../../controllers/postsController.js';
import { verifyUserToken } from '../../middlewares/verifyUsertoken.js';

const router = express.Router();

router.route('/post').get(getAllPosts);
router.route('/post/:id').get(getPost);

router.route('/post').post(verifyUserToken, createNewPost);
router.route('/post/:id').delete(verifyUserToken, deletePost);
router.route('/post/:id').put(verifyUserToken, updatePost);

export default router;
