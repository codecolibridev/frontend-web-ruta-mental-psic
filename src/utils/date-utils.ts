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

/**
 * Formats a date string 'YYYY-MM-DD' for a chart tooltip in Spanish.
 *@param dateString - The date string in 'YYYY-MM-DD' format.
 *@returns The formatted date, e.g., "22 de Diciembre de 2025".
 */
export const formatDateForChartTooltip = (dateString: string) => {
     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return dateString;
     }

     const [year, month, day] = dateString.split('-').map(Number);
     const date = new Date(year, month - 1, day);
     const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
     const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
     const parts = formattedDate.split(' ');
     if (parts.length > 2) {
          parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
     }
     return parts.join(' ');
};

/**
 * Formats a date string 'YYYY-MM-DD' for a chart's X-axis.
 *@param dateString - The date string in 'YYYY-MM-DD' format.
 *@returns The formatted date, e.g., "22 Dic".
 */
export const formatDateForChartXAxis = (dateString: string): string => {
     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return dateString;
     }

     const [year, month, day] = dateString.split('-').map(Number);
     const date = new Date(year, month - 1, day);

     const parts = new Intl.DateTimeFormat('es-ES', {
          day: '2-digit',
          month: 'short',
     }).formatToParts(date);

     const dayPart = parts.find((p) => p.type === 'day')?.value || '';
     let monthPart = parts.find((p) => p.type === 'month')?.value || '';

     if (monthPart) {
          monthPart = monthPart.charAt(0).toUpperCase() + monthPart.slice(1);
     }

     const separator = parts.find((p) => p.type === 'literal')?.value || '/';

     return `${dayPart}${separator}${monthPart}`;
};
