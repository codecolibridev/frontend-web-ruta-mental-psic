'use client';

import { Button } from '@/components';
import PageHeader from '@/components/layout/PageHeader';
import AppointmentsTable from '@/components/ui/AppointmentsTable';
import CreateAppointmentModal from '@/components/modals/CreateAppointmentModal';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
     const [isModalOpen, setIsModalOpen] = useState(false);

     return (
          <div className="flex flex-col">
               <div className="flex">
                    <PageHeader title="Citas" description="Gestión y programación de citas" />

                    <Button
                         variant="primary"
                         type="button"
                         className="h-8 max-w-50 max-h-11 self-center ml-auto"
                         leftIcon={<Plus className="h-4 w-4" />}
                         onClick={() => setIsModalOpen(true)}
                    >
                         Crear Cita
                    </Button>
               </div>
               <AppointmentsTable />
               <CreateAppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
     );
}
