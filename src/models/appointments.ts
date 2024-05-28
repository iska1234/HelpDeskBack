import { z } from "zod";

export const appointmentSchema = z.object({
  userId: z.number(),
  date: z.string(),
  specialization: z.string(),
  type: z.enum(["Seguimiento", "Nueva"]).optional(),
  observations: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;
export type Appointment = AppointmentData & { id: number };

export type Appointments = Appointment[];
