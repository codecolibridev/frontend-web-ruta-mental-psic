import { apiClient } from '@/lib/apiClient';
import { StatusInterface } from '@/types/statusTypes';
import { translateBackendError } from './errors/errorTranslator';

export const getStatus = async (): Promise<StatusInterface[]> => {
     try {
          const response = await apiClient.get<StatusInterface[]>('/status');
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
};
