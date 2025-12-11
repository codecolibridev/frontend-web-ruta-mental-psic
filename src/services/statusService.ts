import { apiClient } from '@/lib/apiClient';
import { StatusInterface } from '@/types/statusTypes';

export const getStatus = async (): Promise<StatusInterface[]> => {
     const response = await apiClient.get<StatusInterface[]>('/status');
     return response.data;
};
