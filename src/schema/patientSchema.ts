import { z } from 'zod';

export const createPatientSchema = z.object({
     first_name: z.string().min(1, 'El nombre es obligatorio'),
     last_name: z.string().min(1, 'El apellido es obligatorio'),
     id_number: z.string().regex(/^\d+$/, 'La cédula debe contener solo números').min(1, 'La cédula es obligatoria'),
     birth_date: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
     email: z.email('El email no es válido').optional(),
     notes: z.string().optional(),
     diagnosis: z.string().optional(),
     psychologist_id: z.number().optional(),
});

export type CreatePatientInterface = z.infer<typeof createPatientSchema>;
