export interface AppointmentStats {
     today: number | null;
     week: number | null;
     month: number | null;
     patientsThisMonth: number | null;
     comparision: {
          todayDiff: number | null;
          weekDiff: number | null;
          monthDiff: number | null;
          patientsMonthDiff: number | null;
     };
}

// recent activity types
export interface Last7Day {
     date: string;
     label: string;
     count: number;
}

export interface Last30Day {
     date: string;
     day: number;
     count: number;
}

export interface ActivityDataAppointment {
     last7days: Last7Day[];
     last30days: Last30Day[];
}

// upcoming appointments
export interface UpcomingAppointment {
     id: number;
     time: string;
     name: string;
     type: 'Confirmada' | 'Pendiente' | 'Cancelada';
}
