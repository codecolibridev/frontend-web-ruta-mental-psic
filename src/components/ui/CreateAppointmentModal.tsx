'use client';

import useCreateAppointment from '@/hooks/appointment/useCreateAppointment';
import { CreateAppointmentInterface, createAppointmentSchema } from '@/schema/appointmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Input from './Input';
import PatientSelect from './PatientSelect';
import PsychologistSelect from './PsychologistSelect';
import { SelectStatusAppointment } from './SelectStatusAppointment';
import TextArea from './TextArea';
import Modal from '../layout/Modal';
import Button from './Button';

export default function CreateAppointmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
     const { mutate } = useCreateAppointment();
     const {
          control,
          register,
          handleSubmit,
          reset,
          setValue,
          formState: { errors },
     } = useForm<CreateAppointmentInterface>({
          resolver: zodResolver(createAppointmentSchema),
          mode: 'onBlur',
     });

     // State for individual date and time parts
     const [datePart, setDatePart] = useState('');
     const [timePart, setTimePart] = useState('');

     // Register the field that will be sent to the backend
     useEffect(() => {
          register('appointment_date');
     }, [register]);

     // Combine date and time and update the form value
     useEffect(() => {
          if (datePart && timePart) {
               const combinedDateTime = new Date(`${datePart}T${timePart}`).toISOString();
               setValue('appointment_date', combinedDateTime, { shouldValidate: true, shouldDirty: true });
          } else {
               // Only validate if user has interacted with date/time fields.
               // We can infer this if either field has a value.
               setValue('appointment_date', '', { shouldValidate: !!(datePart || timePart), shouldDirty: true });
          }
     }, [datePart, timePart, setValue]);

     const onSubmit = async (data: CreateAppointmentInterface) => {
          toast.promise(mutate(data), {
               loading: 'Creando cita...',
               success: () => {
                    reset();
                    setDatePart('');
                    setTimePart('');
                    return 'Cita creada con éxito';
               },
               error: (error) => error.message || 'Error al crear la cita',
          });
     };

     return (
          <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Cita" maxWidth="2xl">
               <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                         {/* Patient */}
                         <div className="flex flex-col">
                              <label className="pb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                   Paciente
                              </label>
                              <Controller
                                   name="patient_id"
                                   control={control}
                                   render={({ field }) => (
                                        <PatientSelect
                                             value={field.value ?? ''}
                                             onChange={(val) => field.onChange(val)}
                                             placeholder="Seleccionar Paciente"
                                             className="relative w-full"
                                        />
                                   )}
                              />
                              {errors.patient_id?.message && (
                                   <p className="mt-1 text-sm text-red-500">{errors.patient_id?.message}</p>
                              )}
                         </div>
                         {/* Status */}
                         <div className="flex gap-4 w-full ">
                              <Controller
                                   name="status_id"
                                   control={control}
                                   render={({ field }) => (
                                        <SelectStatusAppointment
                                             label="Estado"
                                             value={field.value?.toString() ?? ''}
                                             onChange={(val) => field.onChange(parseInt(val, 10))}
                                             placeholder="Seleccionar Estado"
                                        />
                                   )}
                              />
                              {errors.status_id?.message && (
                                   <p className="mt-1 text-sm text-red-500">{errors.status_id?.message}</p>
                              )}

                              <div className="flex flex-col w-full">
                                   <label className="pb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Psicólogo
                                   </label>
                                   <Controller
                                        name="psychologist_id"
                                        control={control}
                                        render={({ field }) => (
                                             <PsychologistSelect
                                                  value={field.value}
                                                  onChange={(val) => field.onChange(val)}
                                                  placeholder="Seleccionar Psicólogo"
                                                  className="relative w-full"
                                             />
                                        )}
                                   />
                                   {errors.psychologist_id?.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.psychologist_id?.message}</p>
                                   )}
                              </div>
                         </div>
                         {/* Psicólogo */}

                         {/* Fecha y Hora */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                   <Input
                                        label="Fecha de la cita"
                                        type="date"
                                        id="date"
                                        value={datePart}
                                        onChange={(e) => setDatePart(e.target.value)}
                                        error={errors.appointment_date?.message}
                                   />
                              </div>

                              <div className="flex flex-col">
                                   <Input
                                        label="Hora de la cita"
                                        type="time"
                                        id="time"
                                        value={timePart}
                                        onChange={(e) => setTimePart(e.target.value)}
                                        error={datePart && !timePart ? 'La hora es requerida' : undefined}
                                   />
                              </div>
                         </div>
                         {/* Notas */}
                         <div className="flex flex-col">
                              <TextArea
                                   label="Notas"
                                   id="notes"
                                   rows={6}
                                   placeholder="Motivo de la consulta, observaciones, antecedentes..."
                                   {...register('notes')}
                                   error={errors.notes?.message}
                              />
                         </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-[#233648] mt-6">
                         <Button variant="ghost" type="button" onClick={onClose}>
                              Cancelar
                         </Button>
                         <Button type="submit">Crear Cita</Button>
                    </div>
               </form>
          </Modal>
     );
}
