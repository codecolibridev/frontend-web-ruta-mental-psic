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
