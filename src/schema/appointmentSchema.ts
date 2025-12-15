import { z } from 'zod';

export const createAppointmentSchema = z.object({
     patient_id: z.number().min(1, 'El ID del paciente es obligatorio'),
     psychologist_id: z.number().min(1, 'El ID del psicólogo es obligatorio'),
     status_id: z.number().optional(),
     appointment_date: z.string().min(1, 'La fecha de la cita es obligatoria'),
     notes: z.string().optional(),
});

export type CreateAppointmentInterface = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInterface = Partial<CreateAppointmentInterface>;
export const DeleteAppointmentSchema = z.object({
     id: z.number(),
});
