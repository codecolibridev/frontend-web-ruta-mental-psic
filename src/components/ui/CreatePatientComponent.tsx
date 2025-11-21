'use client';

import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { CreatePatientInterface, createPatientSchema } from '@/schema/patientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import useCreatePatient from '@/hooks/patients/useCreatePatient';
import { toast } from 'sonner';

export default function CreatePatientComponent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
     const { mutate, isLoading } = useCreatePatient();

     // React Hook Form setup
     const {
          register,
          handleSubmit,
          reset,
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
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                         {/* Header */}
                         <div className="flex items-center justify-between p-6 border-b border-[#233648]">
                              <h3 className="text-text-primary-dark text-xl font-bold">Agregar Nuevo Paciente</h3>
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="text-text-secondary-dark hover:text-text-primary-dark transition"
                              >
                                   <X className="w-6 h-6" />
                              </button>
                         </div>

                         {/* body */}
                         <div className="p-6 space-y-6">
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

                              <Input
                                   label="Email"
                                   id="email"
                                   placeholder="juan.perez@example.com"
                                   type="email"
                                   {...register('email')}
                                   error={errors.email?.message}
                              />

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
                         <div className="flex justify-end gap-4 p-6 border-t border-[#233648]">
                              <Button variant="ghost" type="button" onClick={onClose}>
                                   Cancelar
                              </Button>

                              <Button type="submit" loading={isLoading}>
                                   Guardar Paciente
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
}
