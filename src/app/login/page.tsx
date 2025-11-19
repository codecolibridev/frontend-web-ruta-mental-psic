'use client';

import { useState } from 'react';
import { Mail, Lock, Brain } from 'lucide-react';
import { Input, Button } from '../../components/index';

export default function LoginPage() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [rememberMe, setRememberMe] = useState(false);
     const [isLoading, setIsLoading] = useState(false);

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Set loading state while handling submit
          setIsLoading(true);

          // Simulate async login, replace with actual auth call
          setTimeout(() => {
               console.log({ email, password, rememberMe });
               setIsLoading(false);
          }, 1000);
     };

     return (
          <div className="relative flex min-h-screen w-full flex-col items-center justify-center font-display">
               <div className="flex w-full max-w-md flex-col items-center p-8">
                    {/* Logo */}
                    <div className="mb-6 flex items-center gap-3">
                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                              <Brain className="h-6 w-6 text-white" />
                         </div>
                         <span className="text-xl font-bold text-slate-800 dark:text-white">MindWell</span>
                    </div>

                    {/* Headline */}
                    <div className="w-full text-center">
                         <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                              Inicio de Sesión
                         </h1>
                         <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                              Ingresa tus credenciales para acceder a tu cuenta
                         </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
                         {/* Email */}
                         <Input
                              label="Dirección de correo electrónico"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              icon={<Mail className="h-5 w-5" />}
                         />

                         {/* Password */}
                         <Input
                              label="Contraseña"
                              type="password"
                              placeholder="Ingresa tu contraseña"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              icon={<Lock className="h-5 w-5" />}
                         />

                         {/* Remember + Forgot */}
                         <div className="mt-4 flex w-full items-center justify-between">
                              <div className="flex items-center gap-2">
                                   <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded border-2 border-slate-300 dark:border-slate-600 bg-transparent text-primary checked:border-primary checked:bg-primary checked:bg-[image:--checkbox-tick-svg] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                                   />
                                   <label className="cursor-pointer select-none text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Recuérdame
                                   </label>
                              </div>
                              <a
                                   href="/recuperar-password"
                                   className="text-sm font-medium text-primary hover:underline"
                              >
                                   ¿Olvidaste tu contraseña?
                              </a>
                         </div>

                         {/* Submit */}
                         <div className="mt-6 w-full">
                              <Button type="submit" loading={isLoading}>
                                   Iniciar Sesión
                              </Button>
                         </div>
                    </form>

                    {/* Sign-up */}
                    {/* <div className="mt-8 text-center">
                         <p className="text-sm text-slate-600 dark:text-slate-400">
                              Dont have an account?{' '}
                              <a href="#" className="font-medium text-primary hover:underline">
                                   Sign Up
                              </a>
                         </p>
                    </div> */}
               </div>
          </div>
     );
}
