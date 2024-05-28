import { getAppointmentsByUserId, insertAppointment } from "../data/appointments-data";
import { Appointment, AppointmentData } from "../models/appointments";

export async function insertAppointmentService(
  appointmentData: AppointmentData
) {
  const insertedAppointment = await insertAppointment(appointmentData);

  return insertedAppointment;
}

export async function getAppointmentsByUserService(userId: number): Promise<Appointment[]> {
  const appointments = await getAppointmentsByUserId(userId);
  return appointments;
}