export interface Last7Day {
     date: string; // YYYY-MM-DD
     label: string; // e.g. "Lun", "Mar", "Mié"
     count: number;
}

export interface Last30Day {
     date: string; // YYYY-MM-DD
     day: number; // day of month
     label: string; // display label like "18/12"
     count: number;
}

export interface ActivityData {
     last7days: Last7Day[];
     last30days: Last30Day[];
}

export default ActivityData;
