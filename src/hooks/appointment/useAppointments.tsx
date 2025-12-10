import { getAppointments } from '@/services/appointmentService';
import { Appointment } from '@/types/appointmentTypes';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { useEffect, useState } from 'react';

export default function useAppointments(options: UseParamsOptions) {
     const [data, setData] = useState<Appointment[] | null>(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [meta, setMeta] = useState<PaginatedResponse<Appointment>['meta'] | null>(null);

     const { limit, page } = options || {};

     const fetchAppointments = async () => {
          try {
               setLoading(true);
               setError(null);

               const res = await getAppointments({ limit, page });
               setData(res.data);
               setMeta(res.meta);
          } catch (error) {
               console.error('Error fetching appointments:', error);
               setError((error as Error)?.message || 'Error cargando citas');
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchAppointments();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [limit, page]);

     return { data, isLoading: loading, error, meta };
}
