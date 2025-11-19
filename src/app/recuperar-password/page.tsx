'use client';

import { useState } from 'react';
import { Mail, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { Input, Button } from '../../components/index';

export default function ForgotPasswordPage() {
     const [email, setEmail] = useState('');
     const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
     const [isLoading, setIsLoading] = useState(false);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          setStatus('idle');

          // Aquí iría tu llamada al backend
          // await fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

          // Simulación
          setTimeout(() => {
               if (email.includes('@')) {
                    setStatus('success');
               } else {
                    setStatus('error');
               }
               setIsLoading(false);
          }, 1000);
     };

     return (
          <div className="relative flex min-h-screen w-full flex-col items-center justify-center font-display p-4">
               <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className=" flex items-center gap-3 w-full justify-center">
                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                              <Brain className="h-6 w-6 text-white" />
                         </div>
                         <span className="text-xl font-bold text-slate-800 dark:text-white">MindWell</span>
                    </div>

                    {/* Form Container */}
                    <div className="p-8 rounded-xl shadow-lg w-full">
                         {/* Heading */}
                         <div className="mb-6 text-center">
                              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                   ¿Olvidaste tu contraseña?
                              </h1>
                              <p className="my-4 text-sm text-slate-500 dark:text-slate-400">
                                   No hay problema. Ingresa tu correo y te enviaremos un enlace seguro para
                                   restablecerla.
                              </p>
                         </div>

                         {/* Form */}
                         <form onSubmit={handleSubmit} className="space-y-4">
                              <Input
                                   label="Dirección de correo electrónico"
                                   type="email"
                                   placeholder="tuemail@ejemplo.com"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                                   icon={<Mail className="h-5 w-5" />}
                                   disabled={isLoading}
                              />

                              {/* Success Message */}
                              {status === 'success' && (
                                   <div className="flex items-center gap-3 rounded-lg bg-green-500/10 p-3 text-sm text-green-400 animate-in fade-in slide-in-from-top-2">
                                        <CheckCircle className="h-5 w-5" />
                                        <p>Se ha enviado un enlace de recuperación a tu correo.</p>
                                   </div>
                              )}

                              {/* Error Message */}
                              {status === 'error' && (
                                   <div className="flex items-center gap-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 animate-in fade-in slide-in-from-top-2">
                                        <AlertCircle className="h-5 w-5" />
                                        <p>El correo ingresado no fue encontrado.</p>
                                   </div>
                              )}

                              {/* Submit Button */}
                              <div className="mb-6">
                                   <Button type="submit">Enviar enlace de recuperación</Button>
                              </div>
                         </form>

                         {/* Back to Login */}
                         <p className="text-center">
                              <a
                                   href="/login"
                                   className="font-medium dark:text-primary text-sm hover:text-primary dark:hover:text-primary hover:underline transition-colors"
                              >
                                   ¿Recordaste tu contraseña? Iniciar sesión
                              </a>
                         </p>
                    </div>
               </div>
          </div>
     );
}
