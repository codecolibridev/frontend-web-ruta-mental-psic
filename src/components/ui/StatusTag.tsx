import React from 'react';

interface StatusTagProps {
     status: string;
     className?: string;
}

const getStatusColor = (status: string) => {
     switch (status.toLowerCase()) {
          case 'confirmed':
          case 'confirmada':
               return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
          case 'completed':
          case 'completada':
               return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
          case 'canceled':
          case 'cancelada':
               return 'bg-red-400/10 text-red-400 border-red-400/20';
          case 'pending':
          case 'pendiente':
               return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
          default:
               return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
     }
};

const StatusTag: React.FC<StatusTagProps> = ({ status, className = '' }) => {
     return (
          <span
               className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium border ${getStatusColor(
                    status
               )} ${className}`}
          >
               {status}
          </span>
     );
};

export default StatusTag;
