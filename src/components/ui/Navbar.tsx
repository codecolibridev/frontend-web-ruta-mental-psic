'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Brain, LayoutDashboard, Users, Calendar, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
     href: string;
     label: string;
     icon: React.ReactNode;
}

export default function Navbar() {
     const pathname = usePathname();
     const [collapsed, setCollapsed] = useState(false);

     useEffect(() => {
          const width = collapsed ? '5rem' : '16rem';
          try {
               document.documentElement.style.setProperty('--sidebar-width', width);
          } catch {}
          return () => {
               try {
                    document.documentElement.style.removeProperty('--sidebar-width');
               } catch {}
          };
     }, [collapsed]);

     const navItems: NavItem[] = useMemo(
          () => [
               { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
               { href: '/pacientes', label: 'Pacientes', icon: <Users className="h-5 w-5" /> },
               { href: '/citas', label: 'Citas', icon: <Calendar className="h-5 w-5" /> },
               //   { href: '/facturacion', label: 'Facturación', icon: <Receipt className="h-5 w-5" /> },
               //   { href: '/settings', label: 'Configuración', icon: <Settings className="h-5 w-5" /> },
          ],
          []
     );

     const isActive = (href: string) => pathname === href;

     // refs for indicator animation
     const navRef = useRef<HTMLDivElement | null>(null);
     const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
     const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });

     useEffect(() => {
          const idx = navItems.findIndex((it) => it.href === pathname);
          const el = itemRefs.current[idx ?? -1];
          const navEl = navRef.current;

          if (el && navEl) {
               const elRect = el.getBoundingClientRect();
               const navRect = navEl.getBoundingClientRect();
               const top = elRect.top - navRect.top;
               const height = elRect.height;
               setIndicator({ top, height, opacity: 1 });
          } else {
               setIndicator((s) => ({ ...s, opacity: 0 }));
          }
     }, [pathname, collapsed, navItems]);

     return (
          <aside
               aria-label="Sidebar navigation"
               className={` ${
                    collapsed ? 'w-20' : 'w-64'
               } fixed left-0 top-0 bottom-0 z-40 shrink-0 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-700/50 transition-all duration-200 ease-in-out overflow-hidden`}
          >
               <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                         <div className="flex items-center gap-3 px-2">
                              <div className="bg-primary/10 p-2 -ml-1 rounded-lg flex items-center justify-center">
                                   {collapsed ? (
                                        <button
                                             type="button"
                                             aria-label="Expand sidebar"
                                             onClick={() => setCollapsed(false)}
                                             className="p-1"
                                        >
                                             <ChevronRight className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                                        </button>
                                   ) : (
                                        <Brain className="h-6 w-6 text-primary" />
                                   )}
                              </div>

                              {/* Title (hidden when collapsed) */}
                              <h1
                                   className={`${
                                        collapsed ? 'hidden' : 'text-slate-800 dark:text-white text-lg font-bold'
                                   }`}
                              >
                                   MindWell
                              </h1>

                              {/* Collapse / Expand button - only visible when expanded */}
                              {!collapsed && (
                                   <button
                                        type="button"
                                        aria-label="Collapse sidebar"
                                        onClick={() => setCollapsed(true)}
                                        className="ml-auto rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                   >
                                        <ChevronLeft className="h-4  w-4 text-slate-700 dark:text-slate-300" />
                                   </button>
                              )}
                         </div>

                         {/* Navigation */}
                         <nav ref={navRef} className="relative flex flex-col gap-2">
                              {/* moving indicator */}
                              <div
                                   aria-hidden
                                   className="absolute left-0 right-0 rounded-lg bg-primary/10 dark:bg-primary/10 pointer-events-none transition-all duration-300"
                                   style={{
                                        top: indicator.top,
                                        height: indicator.height,
                                        opacity: indicator.opacity,
                                   }}
                              />
                              {navItems.map((item, index) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.label}
                                        ref={(el: HTMLAnchorElement | null) => {
                                             itemRefs.current[index] = el;
                                        }}
                                        className={
                                             `flex items-center ${
                                                  collapsed ? 'justify-center px-0' : 'justify-start px-3'
                                             } py-2 rounded-lg transition-colors duration-200 relative ` +
                                             (isActive(item.href)
                                                  ? 'text-primary'
                                                  : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white')
                                        }
                                   >
                                        {/* Icon box: fixed size so icons never shift */}
                                        <span className="flex-none w-6 h-6 flex items-center justify-center z-10">
                                             {item.icon}
                                        </span>

                                        {/* Label: animate width + opacity to avoid reflow/overlap */}
                                        <span
                                             className={`overflow-hidden transition-all duration-200 ${
                                                  collapsed ? 'max-w-0 opacity-0' : 'max-w-[140px] opacity-100'
                                             } ${collapsed ? '' : 'ml-3'} z-10`}
                                        >
                                             <p className="text-sm font-medium whitespace-nowrap">{item.label}</p>
                                        </span>
                                   </Link>
                              ))}
                         </nav>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col gap-4">
                         {/* User Profile */}
                         <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-700/50 pt-4">
                              <div className="bg-gray-300 dark:bg-slate-700 border-2 border-dashed rounded-full h-10 w-10 shrink-0" />
                              <div className={`flex flex-col flex-1 ${collapsed ? 'hidden' : ''}`}>
                                   <h3 className="text-slate-800 dark:text-white text-sm font-medium">Dr. Nombre</h3>
                                   <p className="text-slate-600 dark:text-slate-400 text-xs">Psicólogo</p>
                              </div>

                              {!collapsed && (
                                   <LogOut className="h-5 w-5 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-white transition-colors" />
                              )}
                         </div>
                    </div>
               </div>
          </aside>
     );
}
