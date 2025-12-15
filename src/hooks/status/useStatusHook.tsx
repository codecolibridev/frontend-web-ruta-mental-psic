import { getStatus } from '@/services/statusService';
import { StatusInterface } from '@/types/statusTypes';
import { useEffect, useState } from 'react';

export default function useStatusHook() {
     const [data, setData] = useState<StatusInterface[] | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);

     const fetchStatus = async () => {
          try {
               setLoading(true);
               const resp = await getStatus();
               setData(resp);
          } catch (error) {
               console.error('Error fetching status:', error);
               setError((error as Error)?.message ?? 'Error cargando estados');
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchStatus();
     }, []);

     return {
          data,
          loading,
          fetchStatus,
          error,
     };
}
