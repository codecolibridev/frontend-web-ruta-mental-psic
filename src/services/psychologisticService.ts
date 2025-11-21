import { apiClient } from '@/lib/apiClient';
import { Psychologistic } from '@/types/psychologisticTypes';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';

export async function getPsychologistic(params: UseParamsOptions): Promise<PaginatedResponse<Psychologistic>> {
     const response = await apiClient.get<PaginatedResponse<Psychologistic>>('/psychologist', {
          params: { ...params },
     });
     return response.data;
}
