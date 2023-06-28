export interface TransportUserDriver{
    nro_plate: string | number;
    nro_carnet: string | number;
    brand: string;
    model: string;
    status: 'processing' | 'canceled' | 'approved';
    state: boolean;
    minLoad: string | number;
    maxLoad: string | number;
}