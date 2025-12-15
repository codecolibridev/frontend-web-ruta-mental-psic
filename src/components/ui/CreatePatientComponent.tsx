'use client';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { CreatePatientInterface, createPatientSchema } from '@/schema/patientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import useCreatePatient from '@/hooks/patients/useCreatePatient';
import PsychologistSelect from './PsychologistSelect';
import { toast } from 'sonner';
import Modal from '../layout/Modal';

export default function CreatePatientComponent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
     const { mutate, isLoading } = useCreatePatient();

     // React Hook Form setup
     const {
          register,
          handleSubmit,
          reset,
          control,
          formState: { errors },
     } = useForm<CreatePatientInterface>({
          resolver: zodResolver(createPatientSchema),
          mode: 'onBlur',
     });

     const onSubmit = async (data: CreatePatientInterface) => {
          toast.promise(mutate(data), {
               loading: 'Creando paciente...',
               success: () => {
                    reset();
                    return 'Paciente creado con éxito';
               },
               error: (error) => error.message,
          });
     };

     return (
          <Modal isOpen={isOpen} onClose={onClose} title="Agregar Nuevo Paciente" maxWidth="2xl">
               <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input
                                   label="Nombre"
                                   id="firstName"
                                   placeholder="Juan"
                                   {...register('first_name')}
                                   error={errors.first_name?.message}
                              />
                              <Input
                                   label="Apellido"
                                   id="lastName"
                                   placeholder="Pérez"
                                   {...register('last_name')}
                                   error={errors.last_name?.message}
                              />
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input
                                   label="Cédula"
                                   id="idNumber"
                                   placeholder="1-2345-6789"
                                   {...register('id_number')}
                                   error={errors.id_number?.message}
                              />

                              <Input
                                   label="Fecha de nacimiento"
                                   id="birthDate"
                                   placeholder="YYYY-MM-DD"
                                   type="date"
                                   {...register('birth_date')}
                                   error={errors.birth_date?.message}
                              />
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input
                                   label="Email"
                                   id="email"
                                   placeholder="juan.perez@example.com"
                                   type="email"
                                   {...register('email')}
                                   error={errors.email?.message}
                              />

                              <div className="flex w-full flex-col text-md">
                                   <label className="pb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Psicólogo Asignado
                                   </label>
                                   <Controller
                                        name="psychologist_id"
                                        control={control}
                                        render={({ field }) => (
                                             <PsychologistSelect
                                                  value={field.value ?? ''}
                                                  onChange={(val) => field.onChange(val)}
                                                  placeholder="Seleccionar psicólogo"
                                                  className="relative w-full"
                                             />
                                        )}
                                   />
                                   {errors.psychologist_id?.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.psychologist_id?.message}</p>
                                   )}
                              </div>
                         </div>

                         <TextArea
                              label="Notas"
                              id="notes"
                              rows={4}
                              placeholder="Información adicional, alergias, condiciones previas..."
                              {...register('notes')}
                              error={errors.notes?.message}
                         />

                         <TextArea
                              label="Diagnóstico"
                              id="diagnosis"
                              rows={5}
                              placeholder="Diagnóstico principal, observaciones clínicas..."
                              {...register('diagnosis')}
                              error={errors.diagnosis?.message}
                         />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-[#233648] mt-6">
                         <Button variant="ghost" type="button" onClick={onClose}>
                              Cancelar
                         </Button>

                         <Button type="submit" loading={isLoading}>
                              Guardar Paciente
                         </Button>
                    </div>
               </form>
          </Modal>
     );
}
