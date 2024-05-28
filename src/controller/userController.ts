import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { getAllUsersWithUserRole } from "../services/userData";

export async function getAllUsersWithUserController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const savedData = await getAllUsersWithUserRole();

    return res.status(200).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    console.error("Error al obtener todos los datos guardados:", error);
    return next(
      new ApiError("Error al obtener todos los datos guardados", 500)
    );
  }
}
