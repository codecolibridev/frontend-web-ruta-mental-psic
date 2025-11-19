import { PageHeader } from '@/components/index';
import { Button, PatientsTable } from '@/components/index';
import { Plus } from 'lucide-react';

export default function page() {
     return (
          <div className="flex flex-col">
               <div className="flex">
                    <PageHeader title="Paciente" description="Información y detalles del paciente" />
                    <Button
                         variant="primary"
                         type="button"
                         className="h-8 max-w-50 max-h-11 self-center ml-auto"
                         leftIcon={<Plus className="h-4 w-4" />}
                    >
                         Nuevo paciente
                    </Button>
               </div>
               <PatientsTable />
          </div>
     );
}
