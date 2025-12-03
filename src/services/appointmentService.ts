import { apiClient } from '@/lib/apiClient';
import { ActivityDataAppointment, AppointmentStats, UpcomingAppointment } from '@/types/appointmentTypes';

export async function getAppointmentStats(): Promise<AppointmentStats> {
     const response = await apiClient.get<AppointmentStats>('/appointment/stats');
     return response.data;
}

export async function getAppointmentsRecentActivity(): Promise<ActivityDataAppointment> {
     const response = await apiClient.get<ActivityDataAppointment>('/appointment/recent');
     return response.data;
}

export async function getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
     const response = await apiClient.get<UpcomingAppointment[]>('/appointment/upcoming');
     return response.data;
}
