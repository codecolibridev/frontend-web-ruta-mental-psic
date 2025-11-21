import { CreatePatientInterface } from '@/schema/patientSchema';
import { createPatient } from '@/services/patientService';
import { Patient } from '@/types/patients';
import { useState } from 'react';

interface UseCreatePatientResult {
     mutate: (data: Omit<CreatePatientInterface, 'id'>) => Promise<Patient | null>;
     isLoading: boolean;
     error: string | null;
     data: Patient | null;
}

export default function useCreatePatient(): UseCreatePatientResult {
     const [data, setData] = useState<Patient | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const mutate = async (patientData: Omit<CreatePatientInterface, 'id'>): Promise<Patient | null> => {
          setIsLoading(true);
          setError(null);
          setData(null);

          try {
               const newPatient = await createPatient(patientData);
               setData(newPatient);

               return newPatient;
          } catch (error) {
               console.error('Error creating patient:', error);
               const errorMessage = (error as Error)?.message || 'Unknown error';
               setError(errorMessage);

               throw new Error(errorMessage);
          } finally {
               setIsLoading(false);
          }
     };

     return { mutate, isLoading, error, data };
}
