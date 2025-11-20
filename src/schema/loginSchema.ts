import { z } from 'zod';

export const loginSchema = z.object({
     email: z.email('El email no es válido'),
     password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginInterface = z.infer<typeof loginSchema>;
