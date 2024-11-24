export default interface IRide {
    id: number;
    customer_id: number;
    driver_id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    created_at: Date;
}