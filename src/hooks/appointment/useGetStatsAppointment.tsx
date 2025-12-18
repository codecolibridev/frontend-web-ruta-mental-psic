import { getAppointmentStats } from '@/services/appointmentService';
import { AppointmentStats } from '@/types/appointmentTypes';
import { useState } from 'react';

export default function useGetStatsAppointment() {
     const [data, setData] = useState<AppointmentStats | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);

     const fetchAppointmentStats = async () => {
          try {
               setLoading(true);
               setError(null);

               const res = await getAppointmentStats();
               console.log(res.comparision);
               setData(res);
          } catch (error) {
               console.error('Error fetching appointment stats:', error);
               setError((error as Error)?.message || 'Error cargando estadísticas de citas');
          } finally {
               setLoading(false);
          }
     };

     return { data, loading, error, fetchAppointmentStats };
}
