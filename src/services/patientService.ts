import { apiClient } from '@/lib/apiClient';
import { CreatePatientInterface } from '@/schema/patientSchema';
import { Patient } from '@/types/patients';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { translateBackendError } from './errors/errorTranslator';

// fetch a paginated list of patients from the API
export async function getPatients(params: UseParamsOptions): Promise<PaginatedResponse<Patient>> {
     const { limit, page } = params;
     const response = await apiClient.get<PaginatedResponse<Patient>>('/patient', {
          params: { limit, page },
     });

     return response.data;
}

// create a new patient record
export async function createPatient(patientData: Omit<CreatePatientInterface, 'id'>): Promise<Patient> {
     try {
          const response = await apiClient.post<Patient>('/patient', patientData);
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}
