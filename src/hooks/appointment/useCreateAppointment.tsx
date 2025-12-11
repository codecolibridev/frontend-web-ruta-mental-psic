import { CreateAppointmentInterface } from '@/schema/appointmentSchema';
import { createAppointment } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { useState } from 'react';

interface UseCreateAppointmentResult {
     mutate: (data: CreateAppointmentInterface) => Promise<Appointment | null>;
     isLoading: boolean;
}

export default function useCreateAppointment(): UseCreateAppointmentResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (appointmentData: CreateAppointmentInterface): Promise<Appointment | null> => {
          setIsLoading(true);
          try {
               const newPatient = await createAppointment(appointmentData);
               return newPatient;
          } catch (error) {
               console.error('Error creating appointment:', error);
               throw error;
          } finally {
               setIsLoading(false);
          }
     };

     return {
          mutate,
          isLoading,
     };
}
