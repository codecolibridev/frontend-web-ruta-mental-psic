'use client';

import useUpdateAppointment from '@/hooks/appointment/useUpdateAppointment';
import { CreateAppointmentInterface, createAppointmentSchema } from '@/schema/appointmentSchema';
import { Appointment } from '@/types/appointmentTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Button from './Button';
import Input from './Input';
import PatientSelect from './PatientSelect';
import PsychologistSelect from './PsychologistSelect';
import { SelectStatusAppointment } from './SelectStatusAppointment';
import TextArea from './TextArea';

export default function UpdateAppointmentModal({
     isOpen,
     onClose,
     appointment,
     onSuccess,
}: {
     isOpen: boolean;
     onClose: () => void;
     appointment: Appointment | null;
     onSuccess?: () => void;
}) {
     const { mutate, isLoading } = useUpdateAppointment();

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

     // Load data once modal opens
     useEffect(() => {
          if (appointment && isOpen) {
               // Extract date and time from appointment_date
               const appointmentDate = new Date(appointment.appointment_date);
               const dateStr = appointmentDate.toISOString().split('T')[0]; // YYYY-MM-DD
               const timeStr = appointmentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

               reset({
                    patient_id: appointment.patient_id,
                    psychologist_id: appointment.psychologist_id,
                    status_id: appointment.status_id,
                    appointment_date: appointment.appointment_date,
                    notes: appointment.notes ?? '',
               });

               // Update date/time parts after reset to avoid cascading renders
               setTimeout(() => {
                    setDatePart(dateStr);
                    setTimePart(timeStr);
               }, 0);
          }
     }, [appointment, isOpen, reset]);

     // Combine date and time and update the form value
     useEffect(() => {
          if (datePart && timePart) {
               const combinedDateTime = new Date(`${datePart}T${timePart}`).toISOString();
               setValue('appointment_date', combinedDateTime, { shouldValidate: true, shouldDirty: true });
          } else {
               // Only validate if user has interacted with date/time fields.
               setValue('appointment_date', '', { shouldValidate: !!(datePart || timePart), shouldDirty: true });
          }
     }, [datePart, timePart, setValue]);

     const onSubmit = async (data: CreateAppointmentInterface) => {
          if (!appointment) return;

          toast.promise(mutate(appointment.id, data), {
               loading: 'Actualizando cita...',
               success: () => {
                    onSuccess?.();
                    return 'Cita actualizada con éxito';
               },
               error: (error) => error.message || 'Error al actualizar la cita',
          });
     };

     // Modal visibility and animation states
     const [visible, setVisible] = useState<boolean>(isOpen);
     const [closing, setClosing] = useState<boolean>(false);

     useEffect(() => {
          let openerTimer: ReturnType<typeof setTimeout> | undefined;
          let closerTimer: ReturnType<typeof setTimeout> | undefined;
          let rafId: number | undefined;

          if (isOpen && !visible) {
               openerTimer = setTimeout(() => {
                    setVisible(true);
                    setClosing(false);
               }, 0);
          } else if (!isOpen && visible) {
               rafId = requestAnimationFrame(() => {
                    setClosing(true);
                    closerTimer = setTimeout(() => {
                         setClosing(false);
                         setVisible(false);
                    }, 220);
               });
          }

          return () => {
               if (openerTimer) clearTimeout(openerTimer);
               if (closerTimer) clearTimeout(closerTimer);
               if (rafId) cancelAnimationFrame(rafId);
          };
     }, [isOpen, visible]);

     if (!visible) return null;

     return (
          <div
               onClick={onClose}
               className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${
                    closing ? 'overlay-exit' : 'overlay-enter'
               }`}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-2xl rounded-xl border border-[#233648] bg-background-dark m-4 max-h-[90dvh] overflow-auto hide-scrollbar ${
                         closing ? 'modal-exit' : 'modal-enter'
                    }`}
               >
                    <form
                         className="flex flex-col"
                         onSubmit={handleSubmit(onSubmit)}
                         onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                   const target = e.target as HTMLElement | null;
                                   // Allow Enter inside textarea elements
                                   if (!target || target.tagName !== 'TEXTAREA') {
                                        e.preventDefault();
                                   }
                              }
                         }}
                    >
                         {/* Header */}
                         <div className="flex items-center justify-between p-6 border-b border-[#233648]">
                              <h3 className="text-text-primary-dark text-xl font-bold">Editar Cita</h3>
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="text-text-secondary-dark hover:text-text-primary-dark transition"
                              >
                                   <X className="w-6 h-6" />
                              </button>
                         </div>

                         {/* Body */}
                         <div className="p-6 space-y-6">
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

                              {/* Status and Psychologist */}
                              <div className="flex gap-4 w-full">
                                   <div className="flex flex-col w-full">
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
                                   </div>

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
                                             <p className="mt-1 text-sm text-red-500">
                                                  {errors.psychologist_id?.message}
                                             </p>
                                        )}
                                   </div>
                              </div>

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
                         <div className="flex justify-end gap-4 p-6 border-t border-[#233648]">
                              <Button variant="ghost" type="button" onClick={onClose}>
                                   Cancelar
                              </Button>

                              <Button type="submit" loading={isLoading}>
                                   Guardar Cambios
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
}
