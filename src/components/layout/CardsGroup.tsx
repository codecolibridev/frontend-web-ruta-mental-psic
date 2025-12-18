'use client';

import useGetStatsAppointment from '@/hooks/appointment/useGetStatsAppointment';
import { useEffect } from 'react';
import StatCard from '../ui/StatCard';

export default function CardsGroup() {
     const { data, loading, error, fetchAppointmentStats } = useGetStatsAppointment();

     const today = data?.today || 0;
     const week = data?.week || 0;
     const month = data?.month || 0;
     const patientsThisMonth = data?.patientsThisMonth || 0;

     const comparison = {
          dayDiff: data?.comparision?.dayDiff || 0,
          weekDiff: data?.comparision?.weekDiff || 0,
          monthDiff: data?.comparision?.monthDiff || 0,
          patientsMonthDiff: data?.comparision?.patientsMonthDiff || 0,
     };

     useEffect(() => {
          fetchAppointmentStats();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     if (loading) {
          return <div className="mt-6">Loading appointment stats...</div>;
     }

     if (error) {
          return <div className="mt-6">Error loading appointment stats.</div>;
     }

     return (
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
               <StatCard title="Citas de hoy" value={today} diff={comparison.dayDiff} diffLabel="respecto a ayer" />

               <StatCard
                    title="Citas esta semana"
                    value={week}
                    diff={comparison.weekDiff}
                    diffLabel="respecto a la semana pasada"
               />
               <StatCard
                    title="Citas este mes"
                    value={month}
                    diff={comparison.monthDiff}
                    diffLabel="respecto al mes pasado"
               />

               <StatCard
                    title="Pacientes este mes"
                    value={patientsThisMonth}
                    diff={comparison.patientsMonthDiff}
                    diffLabel="respecto al mes pasado"
               />
          </section>
     );
}
