import { User } from "../user";

export interface TransportUserDriver extends TransportDriver{
    estado_transporte: TransportStateDriver;
    state: boolean;
   
}

export type TransportStateDriver = 'pendiente' | 'aprobado' | 'cancelado';

export interface TransportDriver{
    nro_placa: string | number;
    carnet_circulacion: string | number;
    marca: string;
    modelo: string;
    carga_maxima: string | number;
    id_user: string;
    estado_transporte?: TransportStateDriver;
}

export type UserTransport  = TransportUserDriver & User & {
    fecha_creado_transport: string;
    id_user_transporte: string;
}