import PageHeader from '@/components/layout/PageHeader';
import AppointmentsTable from '@/components/ui/AppointmentsTable';

export default function page() {
     return (
          <>
               <PageHeader title="Citas" description="Gestión y programación de citas" />
               <AppointmentsTable />
          </>
     );
}
