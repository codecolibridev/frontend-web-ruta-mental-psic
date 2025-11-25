import { getPsychologist } from '@/services/psychologisticService';
import { Psychologistic } from '@/types/psychologisticTypes';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { useEffect, useState } from 'react';

export default function usePsychologistic(options: UseParamsOptions) {
     const [data, setData] = useState<Psychologistic[]>([]);
     const [meta, setMeta] = useState<PaginatedResponse<Psychologistic>['meta'] | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);

     const { limit, page, search } = options || {};

     const fetchPsychologistData = async () => {
          try {
               setLoading(true);
               setError(null);

               const res = await getPsychologist({ limit, page, search });
               setData(res.data);
               setMeta(res.meta);
          } catch (error) {
               console.error('Error fetching psychologistic data:', error);
               setError((error as Error)?.message || 'Error cargando datos psicologísticos');
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchPsychologistData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [limit, page, search]);

     return {
          data,
          meta,
          isLoading: loading,
          error,
          refetch: fetchPsychologistData,
     };
}
