import { getUpcomingAppointments } from '@/services/appointmentService';
import { UpcomingAppointment } from '@/types/appointmentTypes';
import { useState } from 'react';

export default function useUpcomingAppointments() {
     const [data, setData] = useState<UpcomingAppointment[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const fetchUpcomingAppointments = async () => {
          try {
               setLoading(true);
               setError(null);

               const res = await getUpcomingAppointments();
               setData(res);
          } catch (error) {
               console.error('Error fetching upcoming appointments:', error);
               setError((error as Error)?.message || 'Error cargando próximas citas');
          } finally {
               setLoading(false);
          }
     };

     return {
          data,
          loading,
          error,
          fetchUpcomingAppointments,
     };
}
