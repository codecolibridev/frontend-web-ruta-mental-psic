import { apiClient } from '@/lib/apiClient';
import { AppointmentStats } from '@/types/appointmentTypes';

export async function getAppointmentStats(): Promise<AppointmentStats> {
     const response = await apiClient.get<AppointmentStats>('/appointment/stats');
     return response.data;
}
