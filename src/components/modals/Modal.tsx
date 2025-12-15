'use client';

import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ModalProps {
     isOpen: boolean;
     onClose: () => void;
     title: string;
     children: React.ReactNode;
     maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
     showCloseButton?: boolean;
     closeOnEscape?: boolean;
     closeOnOutsideClick?: boolean;
}

const maxWidthClasses = {
     sm: 'max-w-sm',
     md: 'max-w-md',
     lg: 'max-w-lg',
     xl: 'max-w-xl',
     '2xl': 'max-w-2xl',
     '3xl': 'max-w-3xl',
     '4xl': 'max-w-4xl',
};

const Modal: React.FC<ModalProps> = ({
     isOpen,
     onClose,
     title,
     children,
     maxWidth = '2xl',
     showCloseButton = true,
     closeOnEscape = true,
     closeOnOutsideClick = true,
}) => {
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

     useEffect(() => {
          if (!closeOnEscape) return;

          const handleKey = (e: KeyboardEvent) => {
               if (e.key === 'Escape') onClose();
          };
          window.addEventListener('keydown', handleKey);
          return () => window.removeEventListener('keydown', handleKey);
     }, [onClose, closeOnEscape]);

     if (!visible) return null;

     const handleOverlayClick = () => {
          if (closeOnOutsideClick) {
               onClose();
          }
     };

     return (
          <div
               onClick={handleOverlayClick}
               className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${
                    closing ? 'overlay-exit' : 'overlay-enter'
               }`}
          >
               <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full ${
                         maxWidthClasses[maxWidth]
                    } rounded-xl bg-background-dark border border-[#4A5568]/50 shadow-2xl m-4 max-h-[90dvh] overflow-auto hide-scrollbar ${
                         closing ? 'modal-exit' : 'modal-enter'
                    }`}
               >
                    <div className="flex items-center justify-between p-4 border-b border-[#4A5568]/50">
                         <h2 className="text-lg font-bold text-[#E2E8F0]">{title}</h2>
                         {showCloseButton && (
                              <button
                                   onClick={onClose}
                                   aria-label="Cerrar"
                                   className="p-2 text-[#A0AEC0] hover:text-[#E2E8F0] rounded-full transition-colors"
                              >
                                   <X className="w-5 h-5" />
                              </button>
                         )}
                    </div>
                    <div className="p-6">{children}</div>
               </div>
          </div>
     );
};

export default Modal;
