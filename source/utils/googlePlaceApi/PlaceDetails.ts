import axios, { AxiosError } from "axios";

interface PlaceDetailsResponse {
    html_attributions: any[];
    result:            Result;
    status:            string;
}

interface Result {
    address_components:    AddressComponent[];
    adr_address:           string;
    formatted_address:     string;
    geometry:              Geometry;
    icon:                  string;
    icon_background_color: string;
    icon_mask_base_uri:    string;
    name:                  string;
    photos:                Photo[];
    place_id:              string;
    reference:             string;
    types:                 string[];
    url:                   string;
    utc_offset:            number;
    vicinity:              string;
}

interface AddressComponent {
    long_name:  string;
    short_name: string;
    types:      string[];
}

interface Geometry {
    location: Location;
    viewport: Viewport;
}

interface Location {
    lat: number;
    lng: number;
}

interface Viewport {
    northeast: Location;
    southwest: Location;
}

interface Photo {
    height:            number;
    html_attributions: string[];
    photo_reference:   string;
    width:             number;
}

export interface PlaceDetailsResp{
    ok: boolean;
    message?: string;
    data: Result | null;
}

export const PlaceDetails = async(place_id: string) : Promise<PlaceDetailsResp> =>{
    const msg = 'Posible error de conexión, compruebe que tenga acceso a internet';

    try {
        const { data } = await axios.get<PlaceDetailsResponse>('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
                key: 'AIzaSyBUZ03r1DEZFngHDNz6aIQTO1dFXP7rPaQ',
                place_id: place_id,
                region: 'es'
            }
        });

        const { status, result  } = data;

        if( status !== 'OK'  ){
            return{
                ok: false,
                message: 'Ha ocurrido un error, en obtener la ubicación, por favor intente más tarde.',
                data: null
            }
        }

        return {
            ok: true,
            data: result
        }
    } catch (error) {
        return {
            ok: true,
            message: error instanceof AxiosError && error.message || msg,
            data: null
        }
    }
}


export const GetPostalPlace = (data: AddressComponent[]) => {
    const filter = data.filter(item => item.types.includes('postal_code'));

    return filter.length > 0 ? filter[0].long_name : null;
}