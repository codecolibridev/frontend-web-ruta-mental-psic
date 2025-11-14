'use client';

import { Bell, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Notification {
     id: number;
     title: string;
     description: string;
     time: string;
     unread: boolean;
}

export default function NotificationComponent() {
     const [isOpen, setIsOpen] = useState(false);
     const dropdownRef = useRef<HTMLDivElement>(null);

     const notifications: Notification[] = [
          {
               id: 1,
               title: 'New Patient Assigned',
               description: 'John Doe has been added to your patient list.',
               time: '5 minutes ago',
               unread: true,
          },
          {
               id: 2,
               title: 'Appointment Canceled',
               description: 'Olivia Chen canceled her appointment for tomorrow at 10:30 AM.',
               time: '1 hour ago',
               unread: true,
          },
          {
               id: 3,
               title: 'Unread Message',
               description: 'You have a new message from Liam Gallagher.',
               time: '3 hours ago',
               unread: true,
          },
          {
               id: 4,
               title: 'Billing Reminder',
               description: 'Invoice #1234 for Benjamin Carter is due tomorrow.',
               time: '1 day ago',
               unread: false,
          },
          {
               id: 5,
               title: 'Note Pending',
               description: 'Session note for Sofia Rodriguez is overdue.',
               time: '2 days ago',
               unread: false,
          },
     ];

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
               }
          };

          if (isOpen) {
               document.addEventListener('mousedown', handleClickOutside);
          }

          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, [isOpen]);

     return (
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    className="bg-white dark:bg-background-secondary-dark w-13 h-13 rounded-xl border-[#E5E7EB] border relative flex items-center justify-center transition-transform transform hover:scale-105 dark:hover:bg-background-secondary-dark/80
                    hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
               >
                    <Bell className="w-5 h-5 dark:text-gray-300 text-text-secondary-light" />

                    {/* Animation for new notifications */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
               </button>

               {/* Panel: siempre en DOM para permitir animación CSS */}
               <div
                    className={`absolute right-0 mt-2 origin-top-right rounded-xl border border-[#E5E7EB] dark:border-[#4a5568] shadow-2xl z-50 bg-white dark:bg-background-secondary-dark w-96 sm:w-96 transition-all duration-300 ease-out transform
                         ${
                              isOpen
                                   ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                   : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
                         }`}
               >
                    {/* Header */}
                    <div className="p-4 border-b border-[#E5E7EB] dark:border-[#4a5568] flex justify-between items-center">
                         <h3 className="font-bold text-black dark:text-white text-xl">Notifications</h3>
                         <button className="text-sm text-primary hover:underline font-medium">Clear All</button>
                    </div>

                    <div className="overflow-x-hidden max-h-[550px] overflow-y-auto divide-y divide-[#E5E7EB] dark:divide-[#4a5568]/50">
                         {notifications.map((notif) => (
                              <div
                                   key={notif.id}
                                   className={`p-4 flex gap-4 items-start transition-all duration-200 ease-in-out hover:bg-background-light dark:hover:bg-background-secondary-dark/50 hover:translate-x-0.5 ${
                                        !notif.unread ? 'opacity-50' : 'opacity-100'
                                   }`}
                              >
                                   {/* Notification dot */}
                                   <div
                                        className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                                             notif.unread ? 'bg-primary' : 'bg-transparent'
                                        }`}
                                   />

                                   <div className="flex-1">
                                        <p className="text-base font-medium dark:text-white">{notif.title}</p>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                             {notif.description}
                                        </p>
                                        <p className="text-sm text-text-secondary-light/80 dark:text-text-secondary-dark/80 mt-1">
                                             {notif.time}
                                        </p>
                                   </div>

                                   {notif.unread && (
                                        <button className="p-1 text-gray-300 hover:text-white transition-colors">
                                             <CheckCircle className="w-4 h-4" />
                                        </button>
                                   )}
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}
