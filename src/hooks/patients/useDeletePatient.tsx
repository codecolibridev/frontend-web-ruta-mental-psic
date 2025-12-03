import { deletePatient } from '@/services/patientService';
import { Patient } from '@/types/patients';
import { useState } from 'react';

interface UseDeletePatientResult {
     mutate: (id: number) => Promise<Patient>;
     isLoading: boolean;
}

export default function useDeletePatient(): UseDeletePatientResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (patientId: number): Promise<Patient> => {
          setIsLoading(true);
          try {
               const deleted = await deletePatient(patientId);
               return deleted;
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
