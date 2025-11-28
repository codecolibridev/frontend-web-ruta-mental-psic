export interface PaginatedResponse<T> {
     data: T[];
     meta: {
          total: number;
          page: number;
          lastPage: number;
     };
}

export interface UseParamsOptions {
     page?: number;
     limit?: number;
     search?: string;
     psychologist_id?: number;
}
