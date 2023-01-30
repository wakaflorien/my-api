import express from 'express';
import { createUser, updateUser } from '../../controllers/userController';
import { verifyUserToken } from '../../middlewares/verifyUsertoken';

const router = express.Router();

router.route('/create').post(createUser);
router.route('/user/:id').put(verifyUserToken, updateUser)

export default router;
