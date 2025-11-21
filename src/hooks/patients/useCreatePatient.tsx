import { CreatePatientInterface } from '@/schema/patientSchema';
import { createPatient } from '@/services/patientService';
import { Patient } from '@/types/patients';
import { useState } from 'react';

interface UseCreatePatientResult {
     mutate: (data: Omit<CreatePatientInterface, 'id'>) => Promise<Patient | null>;
     isLoading: boolean;
}

export default function useCreatePatient(): UseCreatePatientResult {
     const [isLoading, setIsLoading] = useState(false);

     const mutate = async (patientData: Omit<CreatePatientInterface, 'id'>): Promise<Patient | null> => {
          setIsLoading(true);

          try {
               const newPatient = await createPatient(patientData);
               return newPatient;
          } catch (error) {
               // console.error('Error creating patient:', error);
               throw error;
          } finally {
               setIsLoading(false);
          }
     };

     return { mutate, isLoading };
}
