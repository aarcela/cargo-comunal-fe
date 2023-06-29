import { DataLocationGooglePlace } from "../googleMap";
import { Location } from "../location";
import { MethodPayment } from "../methodPayment";
import { RouteUser, UserApplicant, UserDriver } from '../user';


export interface Shipment extends CreatedShipment{
    ubication: UbicationShipment;

    route: RouteUser;

    weightLoad: number | string;

    applicant: UserApplicant;

    driver: Driver;

    methodPayment: MethodPayment;

    total: string | number;

    
}

export interface CreatedShipment{
    id: string | number;
}

export interface UbicationShipment{
    ubication: { 
        origin: UbicationOrigin;
        destination: UbicationDestination;

        kmOriginToDestination: string | null; 
    };
}

export interface UbicationOrigin extends DataLocationGooglePlace{
    dateTimeInput?: string | null;
    dateTimeOuput?: string | null;
}

export interface UbicationDestination extends DataLocationGooglePlace{
    dateInput?: string | null;
    timeInput?: string | null;
}

export interface Driver extends UserDriver{
    location: Location;
}