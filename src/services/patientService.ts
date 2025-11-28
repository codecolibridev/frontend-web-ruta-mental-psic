import { apiClient } from '@/lib/apiClient';
import { CreatePatientInterface } from '@/schema/patientSchema';
import { Patient } from '@/types/patients';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { translateBackendError } from './errors/errorTranslator';

// fetch a paginated list of patients from the API
export async function getPatients(params: UseParamsOptions): Promise<PaginatedResponse<Patient>> {
     const { limit, page, search, psychologist_id } = params;

     const response = await apiClient.get<PaginatedResponse<Patient>>('/patient', {
          params: { limit, page, search, psychologist_id },
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

// update patient record
export async function updatePatient(patientId: number, patientData: Partial<CreatePatientInterface>): Promise<Patient> {
     try {
          const response = await apiClient.patch<Patient>(`/patient/${patientId}`, patientData);
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}

// delete a patient record
export async function deletePatient(patientId: number): Promise<Patient> {
     try {
          const response = await apiClient.delete<Patient>(`/patient/${patientId}`);
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}
