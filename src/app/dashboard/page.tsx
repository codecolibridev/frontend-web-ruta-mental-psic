import { CardsGroup, UpcomingAppointments, WeeklyActivityChart } from '@/components/index';
import NotificationComponent from '@/components/layout/Notification';
import PageHeader from '@/components/layout/PageHeader';

export default function Page() {
     return (
          <>
               <div className="flex flex-col min-w-full">
                    <div className="flex min-w-full justify-between items-center">
                         <PageHeader title="Dashboard" description="Resumen y estadísticas de la actividad" />
                         <NotificationComponent />
                    </div>

                    <CardsGroup />
                    {/* graphs */}

                    <div className="flex flex-col md:flex-row mt-10 gap-4">
                         <WeeklyActivityChart />
                         <UpcomingAppointments />
                    </div>
               </div>
          </>
     );
}
