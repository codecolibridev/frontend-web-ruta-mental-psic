import { useState } from 'react';
import { updatePatient } from '@/services/patientService';
import { Patient } from '@/types/patients';
import { UpdatePatientInterface } from '@/schema/patientSchema';

interface UseUpdatePatientResult {
     mutate: (id: number, data: Partial<UpdatePatientInterface>) => Promise<Patient | null>;
     isLoading: boolean;
}

export default function useUpdatePatient(): UseUpdatePatientResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (
          patientId: number,
          patientData: Partial<UpdatePatientInterface>
     ): Promise<Patient | null> => {
          setIsLoading(true);

          try {
               const updated = await updatePatient(patientId, patientData);
               return updated;
          } catch (error) {
               throw error;
          } finally {
               setIsLoading(false);
          }
     };

     return { mutate, isLoading };
}
