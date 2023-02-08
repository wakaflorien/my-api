import express from 'express';
import { createUser, updateUser } from '../../controllers/userController';
import { verifyUserToken } from '../../middlewares/verifyUsertoken';

const router = express.Router();

/**
 * @swagger
 * /api/v1/create:
 *  post:
 *    tags:
 *    - "User"
 *    summary: Create an account
 *    description: Fill in your email, firstname, lastname and password
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: test@domain.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: test123
 *               firstname:
 *                 type: string
 *                 description: The user's firstname.
 *                 example: Graham
 *               lastname:
 *                 type: string
 *                 description: The user's lastnaname.
 *                 example: Leanne
 *    responses:
 *      201:
 *        description: A new user created successfully!
 *      400:
 *        description: All fields are required required!
 *      409:
 *        description: User already exists
 *      500:
 *        description: Internal server error
 */
router.route('/create').post(createUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  put:
 *    summary: Update the user information
 *    tags: [User]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 *      500:
 *        description: Internal server error
 */
router.route('/user/:id').put(verifyUserToken, updateUser);

export default router;
