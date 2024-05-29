import express from 'express';

import { getAppointmentDetailsController, getAppointmentsByUserController, insertAppointmentController } from '../controller/appointmentController';

const appointmentRouter = express.Router();


appointmentRouter.post('/new',  insertAppointmentController);
appointmentRouter.get('/all/:userId', getAppointmentsByUserController);
appointmentRouter.get('/details/:id', getAppointmentDetailsController);
export default appointmentRouter;