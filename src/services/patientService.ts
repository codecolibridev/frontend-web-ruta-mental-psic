import { apiClient } from '@/lib/apiClient';
import { Patient } from '@/types/patients';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';

export async function getPatients(params: UseParamsOptions): Promise<PaginatedResponse<Patient>> {
     const { limit, page } = params;
     const response = await apiClient.get<PaginatedResponse<Patient>>('/patient', {
          params: { limit, page },
     });

     return response.data;
}
