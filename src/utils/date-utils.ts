// Utility function to format a date string for HTML input type="date" (YYYY-MM-DD)
export const formatDateForInput = (dateString?: string | null) => {
     if (!dateString) return '';
     const match = dateString.match(/^(\d{4}-\d{2}-\d{2})/);
     if (match) return match[1];
     return '';
};

// Formats a date string and calculates age, returning a string like "27 de junio de 2025 (30 años)"
export const formatDateAndAge = (dateStr?: string | null) => {
     if (!dateStr) return '-';

     // Extract YYYY-MM-DD from common backend formats to avoid timezone shifts
     // Examples handled: "2025-06-27", "2025-06-27T00:00:00.000Z", "2025-06-27 00:00:00"
     const match = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
     let d: Date;
     if (match) {
          const year = Number(match[1]);
          const month = Number(match[2]);
          const day = Number(match[3]);
          d = new Date(year, month - 1, day);
     } else {
          d = new Date(dateStr);
     }

     if (isNaN(d.getTime())) return String(dateStr);

     const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
     const formatted = formatter.format(d);

     const today = new Date();
     let age = today.getFullYear() - d.getFullYear();
     const m = today.getMonth() - d.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
          age--;
     }

     return `${formatted} (${age} años)`;
};
