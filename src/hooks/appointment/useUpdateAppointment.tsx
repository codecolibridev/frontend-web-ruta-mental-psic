import { UpdateAppointmentInterface } from '@/schema/appointmentSchema';
import { updateAppointment } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { useState } from 'react';

interface UseUpdateAppointmentResult {
     mutate: (id: number, data: Partial<UpdateAppointmentInterface>) => Promise<Appointment | null>;
     isLoading: boolean;
}

export default function useUpdateAppointment(): UseUpdateAppointmentResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (id: number, data: Partial<UpdateAppointmentInterface>) => {
          setIsLoading(true);

          try {
               const updated = await updateAppointment(id, data);
               return updated;
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
