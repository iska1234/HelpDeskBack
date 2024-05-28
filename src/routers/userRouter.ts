import express from 'express';

import { authenticateHandler } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { getAllUsersWithUserController } from '../controller/userController';


const userRouter = express.Router();


userRouter.get('/all', authenticateHandler, authorize("admin"), getAllUsersWithUserController);


export default userRouter;