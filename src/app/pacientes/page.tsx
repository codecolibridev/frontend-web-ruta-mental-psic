'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/index';
import { Button, PatientsTable, CreatePatientComponent } from '@/components/index';
import { Plus } from 'lucide-react';

export default function Page() {
     const [isModalOpen, setIsModalOpen] = useState(false);

     return (
          <div className="flex flex-col">
               <div className="flex">
                    <PageHeader title="Paciente" description="Información y detalles del paciente" />
                    <Button
                         variant="primary"
                         type="button"
                         className="h-8 max-w-50 max-h-11 self-center ml-auto"
                         leftIcon={<Plus className="h-4 w-4" />}
                         onClick={() => setIsModalOpen(true)}
                    >
                         Nuevo paciente
                    </Button>
               </div>
               <PatientsTable />

               <CreatePatientComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
     );
}
