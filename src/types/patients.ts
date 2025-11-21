import { PaginatedResponse } from './responseTypes';

export type RawPatient = {
     id: number;
     first_name: string;
     last_name: string;
     id_number: string;
     email?: string | null;
     diagnosis?: string | null;
};

export type UiPatient = {
     id: number;
     name: string;
     id_number: string;
     therapist: string;
     email?: string | null;
     diagnosis?: string | null;
};

export interface Patient {
     id: number;
     psychologist_id: number;
     first_name: string;
     last_name: string;
     id_number: string;
     birth_date: string;
     email: string;
     notes: string;
     diagnosis: string;
     updated_at: string | null;
     deleted_at: string | null;
     created_at: string;
}

export interface UsePatientsResult {
     data: Patient[];
     meta: PaginatedResponse<Patient>['meta'] | null;
     isLoading: boolean;
     error: string | null;
     refetch: () => void;
}
