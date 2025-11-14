import NotificationComponent from '@/components/layout/Notification';
import PageHeader from '@/components/layout/PageHeader';

export default function Page() {
     return (
          <>
               <div className="flex justify-between min-w-full items-center">
                    <PageHeader title="Dashboard" description="Resumen y estadísticas de la actividad" />
                    <NotificationComponent />
               </div>
          </>
     );
}
