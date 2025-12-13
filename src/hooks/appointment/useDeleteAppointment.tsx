import { deleteAppointment } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { useState } from 'react';

interface UseDeleteAppointmentResult {
     mutate: (id: number) => Promise<Appointment>;
     isLoading: boolean;
}
export default function useDeleteAppointment(): UseDeleteAppointmentResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (id: number): Promise<Appointment> => {
          setIsLoading(true);
          try {
               const deletedAppointment = await deleteAppointment(id);
               return deletedAppointment;
          } catch (error) {
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
