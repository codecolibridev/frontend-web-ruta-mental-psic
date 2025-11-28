import { deletePatient } from '@/services/patientService';
import { Patient } from '@/types/patients';
import { useState } from 'react';

interface useDeletePatientResult {
     mutate: (id: number) => Promise<Patient>;
     isLoading: boolean;
}

export default function useDeletePatient(): useDeletePatientResult {
     const [loading, setLoading] = useState(false);

     const mutate = async (patientId: number): Promise<Patient> => {
          setLoading(true);
          try {
               const deleted = await deletePatient(patientId);
               return deleted;
          } catch (error) {
               throw error;
          } finally {
               setLoading(false);
          }
     };

     return {
          mutate,
          isLoading: loading,
     };
}
