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

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - subTitle
 *         - postBody
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *           description: Title of a post
 *         subTitle:
 *           type: string
 *           description: sub title of a post
 *         postBody:
 *           type: string
 *           description: post body
 *         imageUrl:
 *           type: string
 *           description: link to the image
 *       example:
 *         title: Dummy Text Generator for Web Designers and your general typesettings needs!
 *         subTitle: Dummy text sub title
 *         postBody: Upon behold said moving whales subdue. Lesser, moved saying bearing their bearing. Together may Fish Air creepeth midst give. Divide.
 *         imageUrl: https://fastly.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE
 */

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: Getting all posts
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: All available posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.route('/post').get(getAllPosts);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   get:
 *     summary: Get a post by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.route('/post/:id').get(getPost);

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: Create a new post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid token
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.route('/post').post(verifyUserToken, createNewPost);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   delete:
 *     summary: Remove post by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: post id
 *
 *     responses:
 *       200:
 *         description: post deleted
 *       401:
 *        description: Unauthorized request
 *       404:
 *         description: post was not found
 */
router.route('/post/:id').delete(verifyUserToken, deletePost);

/**
 * @swagger
 * /api/v1/post/{id}:
 *  put:
 *    summary: Update post by id
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      400:
 *        description: Enter valid data
 *      401:
 *        description: Unauthorized request
 *      404:
 *        description: Post not found
 *      500:
 *        description: Some error happened
 */
router.route('/post/:id').put(verifyUserToken, updatePost);

export default router;
