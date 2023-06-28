import { DataLocationGooglePlace } from "../googleMap";
import { Location } from "../location";
import { MethodPayment } from "../methodPayment";
import { RouteUser, UserApplicant, UserDriver } from '../user';


export interface Shipment extends CreatedShipment{
    ubication: {
        origin: DataLocationGooglePlace & {
            dateTimeInput: string | null;
            dateTimeOuput: string | null;
        };
        destination: DataLocationGooglePlace & {
            dateInput: string | null;
            timeInput: string | null;
        };

        kmOriginToDestination: string | null; 
    };

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


export interface Driver extends UserDriver{
    location: Location;
}