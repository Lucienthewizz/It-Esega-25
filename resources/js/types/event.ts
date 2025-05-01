export interface Event {
    id: number;
    title: string;
    due_date: Date;
    end_date?: Date;
    description: string;
    category: string;
    location?: string;
    status?: boolean;
}
