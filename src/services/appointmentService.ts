import { apiClient } from '@/lib/apiClient';
import { CreateAppointmentInterface } from '@/schema/appointmentSchema';
import { ActivityDataAppointment, AppointmentStats, UpcomingAppointment, Appointment } from '@/types/appointmentTypes';
import { PaginatedResponse, UseParamsOptions } from '@/types/responseTypes';
import { translateBackendError } from './errors/errorTranslator';

export async function getAppointments(options?: UseParamsOptions): Promise<PaginatedResponse<Appointment>> {
     try {
          const response = await apiClient.get<PaginatedResponse<Appointment>>('/appointment', {
               params: { ...options },
          });
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}

export const createAppointment = async (appointmentData: CreateAppointmentInterface): Promise<Appointment> => {
     try {
          const response = await apiClient.post<Appointment>('/appointment', appointmentData);
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
};

export async function getAppointmentStats(): Promise<AppointmentStats> {
     try {
          const response = await apiClient.get<AppointmentStats>('/appointment/stats');
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}

export async function getAppointmentsRecentActivity(): Promise<ActivityDataAppointment> {
     try {
          const response = await apiClient.get<ActivityDataAppointment>('/appointment/recent');
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}

export async function getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
     try {
          const response = await apiClient.get<UpcomingAppointment[]>('/appointment/upcoming');
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}

export async function updateAppointment(
     appointmentId: number,
     appointmentData: Partial<Appointment>
): Promise<Appointment> {
     try {
          const response = await apiClient.patch<Appointment>(`/appointment/${appointmentId}`, appointmentData);
          return response.data;
     } catch (error: unknown) {
          const friendlyMessage = translateBackendError(error);
          throw new Error(friendlyMessage);
     }
}
