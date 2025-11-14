import NotificationComponent from '@/components/Notification';
import PageHeader from '@/components/PageHeader';

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
