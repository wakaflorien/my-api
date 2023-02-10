import express from 'express';
import {
  addMessage,
  deleteMessage,
  getAllMessage,
  getMessage,
  updateMessage,
} from '../../controllers/contactController.js';
import { verifyUserToken } from '../../middlewares/verifyUsertoken.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - message
 *       properties:
 *         fullName:
 *           type: string
 *           description: name of a comentator
 *         email:
 *           type: string
 *           description: email of a comentator
 *         message:
 *           type: string
 *           description: message body
 *       example:
 *         fullName: John Doe
 *         email: johndoe@domain.com
 *         message: Upon behold said moving whales subdue.
 */

/**
 * @swagger
 * /api/v1/message:
 *   get:
 *     summary: Getting all messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: All available messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Couldn't get messages
 */
router.route('/message').get(verifyUserToken, getAllMessage);

/**
 * @swagger
 * /api/v1/message:
 *   post:
 *     summary: Create a new message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The message was added created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid token
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.route('/message').post(addMessage);

/**
 * @swagger
 * /api/v1/message/{id}:
 *   get:
 *     summary: Get a message by id
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: The message description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Internal server error
 */
router.route('/message/:id').get(getMessage);

/**
 * @swagger
 * /api/v1/message/{id}:
 *  put:
 *    summary: Update message by id
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The message id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               message:
 *                 type: string
 *                 description: This is updated message.
 *                 example: This message have to be working at least there is no way updated
 *    responses:
 *      200:
 *        description: message was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      400:
 *        description: Enter valid data
 *      401:
 *        description: Unauthorized request
 *      404:
 *        description: Post not found
 *      500:
 *        description: Some error happened
 */
router.route('/message/:id').put(verifyUserToken, updateMessage)

/**
 * @swagger
 * /api/v1/message/{id}:
 *   delete:
 *     summary: Remove message by id
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the message id
 *
 *     responses:
 *       200:
 *         description: message deleted
 *       401:
 *        description: Unauthorized request
 *       404:
 *         description: post was not found
 *       500:
 *         description: internal server error
 */
router.route('/message/:id').delete(verifyUserToken, deleteMessage)
export default router;
