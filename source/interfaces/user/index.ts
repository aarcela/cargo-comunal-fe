import { TransportUserDriver } from "../transport";

export interface UserEntity {
    first_name:         string;
    second_name?:       string | null;
    first_surname:      string;
    second_surname?:    string | null;
    phone:              string;
    ci:                 string;
    fecha_nc:           string;
    email:              string;
    username:           string;
    role:               RoleUser;
    password?:          string;
}

export interface User extends UserEntity{
    id: string;
    estado:         StateUser;
    fecha_creado: string;
    token: string;
}

export interface LoginResponse {
    data:         User;
    token_type:   string;
}

export interface RouteUser{
    value: string | number;
    name: string;
}

export interface UserDriver extends User{
    role: 'conductor';
    route: RouteUser | RouteUser[];
    transport: TransportUserDriver | TransportUserDriver[];
}


export interface UserApplicant extends User{
    role: 'solicitante'
}


export type RoleUser =  'conductor' | 'solicitante' | 'administrador' | 'analista';
export type StateUser = 'pendiente' | 'aprobado' | 'cancelado';