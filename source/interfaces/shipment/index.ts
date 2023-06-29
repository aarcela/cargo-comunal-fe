import { DataLocationGooglePlace } from "../googleMap";
import { Location } from "../location";
import { MethodPayment } from "../methodPayment";
import { RouteUser, UserApplicant, UserDriver } from '../user';


export interface Shipment{
    id?: string | number | null;

    ubication: UbicationShipment;

    route: RouteShipment;

    weightLoad: WeightLoadShipment;

    applicant: CreateByShipment;

    driver: DriverShipment;

    methodPayment: MethodPaymentShipment;

    total: TotalShipment;

    
}

export type RouteShipment = RouteUser;

export type WeightLoadShipment = number | string;

export type CreateByShipment = UserApplicant;

export type DriverShipment = UserDriver & {
    location: Location;
};

export type MethodPaymentShipment = MethodPayment;

export type TotalShipment = string | number;

export interface CreatedShipment extends Shipment{
    
}

export interface UbicationShipment{
    origin: UbicationOrigin;
    destination: UbicationDestination;

    kmOriginToDestination: string | null; 
}

export interface UbicationOrigin extends DataLocationGooglePlace{
    dateTimeInput?: string | null;
    dateTimeOuput?: string | null;
}

export interface UbicationDestination extends DataLocationGooglePlace{
    dateInput?: string | null;
    timeInput?: string | null;
}

export interface ShipmentCreate {
    ubication: UbicationShipment;

    route: RouteShipment | null;

    weightLoad: WeightLoadShipment | null;

    applicant: CreateByShipment | null;

    driver: DriverShipment | null;

    methodPayment: MethodPaymentShipment | null;

    total: TotalShipment | null;
}

