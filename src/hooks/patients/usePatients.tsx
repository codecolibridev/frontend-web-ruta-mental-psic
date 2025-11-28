'use client';

import { getPatients } from '@/services/patientService';
import { Patient, UsePatientsResult } from '@/types/patients';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { useEffect, useState } from 'react';

export default function usePatients(options?: UseParamsOptions): UsePatientsResult {
     const [data, setData] = useState<Patient[]>([]);
     const [meta, setMeta] = useState<PaginatedResponse<Patient>['meta'] | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);

     const { limit, page, search, psychologist_id } = options || {};

     const fetchPatients = async () => {
          try {
               setLoading(true);
               setError(null);

               const res = await getPatients({ limit, page, search, psychologist_id });
               setData(res.data);
               setMeta(res.meta);
          } catch (error) {
               console.error('Error fetching patients:', error);
               setError((error as Error)?.message || 'Error cargando pacientes');
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchPatients();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [limit, page, search, psychologist_id]);

     return {
          data,
          meta,
          isLoading: loading,
          error,
          refetch: fetchPatients,
     };
}
