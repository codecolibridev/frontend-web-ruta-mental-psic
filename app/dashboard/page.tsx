import { CardsGroup, UpcomingAppointments } from '@/components/index';
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

                    <div className="flex mt-10">
                         {/* Graph */}
                         <UpcomingAppointments />
                    </div>
               </div>
          </>
     );
}
