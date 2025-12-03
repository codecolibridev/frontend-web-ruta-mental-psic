import { getAppointmentsRecentActivity } from '@/services/appointmentService';
import { ActivityDataAppointment } from '@/types/appointmentTypes';
import { useEffect, useState } from 'react';

export default function useGetRecentActivityAppointment() {
     const [data, setData] = useState<ActivityDataAppointment | null>(null);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const fetchRecentActivity = async () => {
               try {
                    const res = await getAppointmentsRecentActivity();
                    setData(res);
               } catch (error) {
                    console.error('Error fetching recent activity appointments:', error);
                    setError((error as Error)?.message || 'Error cargando estadísticas de citas');
               } finally {
                    setLoading(false);
               }
          };
          fetchRecentActivity();
     }, []);

     return { data, loading, error };
}
