import {
  getAppointmentDetails,
  getAppointmentsByUserId,
  insertAppointment,
} from "../data/appointments-data";
import { Appointment, AppointmentData } from "../models/appointments";

export async function insertAppointmentService(
  appointmentData: AppointmentData
) {
  const insertedAppointment = await insertAppointment(appointmentData);

  return insertedAppointment;
}

export async function getAppointmentsByUserService(
  userId: number
): Promise<Appointment[]> {
  const appointments = await getAppointmentsByUserId(userId);
  return appointments;
}

export async function getAppointmentDetailsService(
  appointmentId: number
): Promise<Appointment | null> {
  const appointmentDetails = await getAppointmentDetails(appointmentId);
  return appointmentDetails;
}
