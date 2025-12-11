import { CreateAppointmentInterface } from '@/schema/appointmentSchema';
import { createAppointment } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { useState } from 'react';

interface UseCreateAppointmentResult {
     mutate: (data: CreateAppointmentInterface) => Promise<Appointment | null>;
     isLoading: boolean;
     error: string | null;
}

export default function useCreateAppointment(): UseCreateAppointmentResult {
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const mutate = async (appointmentData: CreateAppointmentInterface): Promise<Appointment | null> => {
          setIsLoading(true);
          try {
               const newPatient = await createAppointment(appointmentData);
               return newPatient;
          } catch (error) {
               console.error('Error creating appointment:', error);
               setError('Failed to create appointment. Please try again.');
               throw error;
          } finally {
               setIsLoading(false);
          }
     };

     return {
          mutate,
          isLoading,
          error,
     };
}
