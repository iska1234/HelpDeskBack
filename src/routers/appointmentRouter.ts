import express from 'express';
import { authenticateHandler } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { getAppointmentsByUserController, insertAppointmentController } from '../controller/appointmentController';

const appointmentRouter = express.Router();


appointmentRouter.post('/new', authenticateHandler, authorize("admin", "user"), insertAppointmentController);
appointmentRouter.get('/all/:userId', authenticateHandler, authorize("admin", "user"), getAppointmentsByUserController);

export default appointmentRouter;