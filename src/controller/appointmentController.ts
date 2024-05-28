import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { getAppointmentsByUserService, insertAppointmentService } from "../services/appointmentService";
import { appointmentSchema } from "../models/appointments";
import z from "zod";

export const insertAppointmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const appointmentData = appointmentSchema.parse(req.body);

    const insertedAppointment = await insertAppointmentService(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Cita insertada exitosamente",
      data: insertedAppointment,
    });
  } catch (error: any) {
    console.error("Error en la inserción de la cita:", error);

    if (error instanceof z.ZodError) {
      const details: Record<string, string> = {};

      error.errors.forEach(err => {
        switch (err.path[0]) {
          case 'userId':
            details['userId'] = "El campo 'userId' es obligatorio y debe ser un número";
            break;
          case 'date':
            details['date'] = "El campo 'date' es obligatorio y debe ser una cadena de caracteres";
            break;
          case 'specialization':
            details['specialization'] = "El campo 'specialization' es obligatorio y debe ser una cadena de caracteres";
            break;
          default:
            break;
        }
      });

      const errorMessage = "Error en la inserción de la cita";

      return res.status(400).json({
        ok: false,
        error: {
          message: errorMessage,
          details: details
        }
      });
    } else {
      return next(new ApiError("Error interno del servidor", 500));
    }
  }
};

export const getAppointmentsByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  
    const userId = parseInt(req.params['userId']);


    if (isNaN(userId)) {
      throw new ApiError("ID de usuario no válido", 400);
    }

    const appointments = await getAppointmentsByUserService(userId);


    return res.status(200).json({
      success: true,
      message: "Citas del usuario obtenidas exitosamente",
      data: appointments,
    });
  } catch (error: any) {
    console.error("Error al obtener las citas del usuario:", error);

    if (error instanceof ApiError) {
      return res.status(error.status).json({
        ok: false,
        error: { message: error.message }
      });
    } else {

      return next(new ApiError("Error interno del servidor", 500));
    }
  }
};