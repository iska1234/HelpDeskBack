import { query } from "../db/index";
import { Appointment, AppointmentData } from "../models/appointments";

export async function insertAppointment(
  appointmentData: AppointmentData
): Promise<Appointment> {
  const { userId, date, specialization, type = "Nueva", observations } = appointmentData;

  const insertedAppointment = (
    await query(
      "INSERT INTO appointments (user_id, date, specialization, type, observations) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, date, specialization, type, observations || '']
    )
  ).rows[0];

  return insertedAppointment;
}


export async function getAppointmentsByUserId(userId: number): Promise<Appointment[]> {
  const { rows } = await query(
    "SELECT a.*, u.name AS user_name FROM appointments a JOIN users u ON a.user_id = u.id WHERE a.user_id = $1 ORDER BY a.date ASC; ",
    [userId]
  );

  return rows;
}

export async function getAppointmentDetails(appointmentId: number): Promise<Appointment | null> {
  const { rows } = await query(
    "SELECT * FROM appointments WHERE id = $1",
    [appointmentId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}