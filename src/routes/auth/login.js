import express from 'express';
import { login } from '../../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstname
 *         - lastname
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: secret password of the user
 *         firstname:
 *           type: string
 *           description: firstname of the user
 *         lastname:
 *           type: string
 *           description: lastname of the user
 *       example:
 *         email: example@domain.com
 *         password: test123!
 *         firstname: John
 *         lastname: Doe
 */

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *    tags:
 *    - "User"
 *    summary: Login with correct credentials
 *    description: Use email and password to Authenticate yourself
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: test@domain.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: test123
 *    responses:
 *      200:
 *        description: login Success
 *      400:
 *        description: username and password are required
 *      404:
 *        description: user not found
 */
router.route('/login').post(login);

export default router;
