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
