export interface CheckInEvent {
    id: string;
    name: string;
    site_id: string;
    type: 'in' | 'out';
    timestamp: string;
}