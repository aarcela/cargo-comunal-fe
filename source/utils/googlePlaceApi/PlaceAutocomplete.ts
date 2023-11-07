import axios, { AxiosError } from 'axios';

interface PlaceAutocompleteResponse{
    predictions: Prediction[];
    status:      string;
}

interface Prediction {
    description:           string;
    matched_substrings:    MatchedSubstring[];
    place_id:              string;
    reference:             string;
    structured_formatting: StructuredFormatting;
    terms:                 Term[];
    types:                 string[];
  }
  
interface MatchedSubstring {
    length: number;
    offset: number;
}

interface StructuredFormatting {
    main_text:                    string;
    main_text_matched_substrings: MatchedSubstring[];
    secondary_text:               string;
}

interface Term {
    offset: number;
    value:  string;
}


export interface PlaceAutocompleteResp{
    ok: boolean;
    message?: string;
    data: Prediction[];
}

export const PlaceAutocomplete = async(text:string) : Promise<PlaceAutocompleteResp> =>  {
    const msg = 'Posible error de conexión, compruebe que tenga acceso a internet';
        
    try {
        const { data } = await axios.get<PlaceAutocompleteResponse>('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                key: 'AIzaSyBUZ03r1DEZFngHDNz6aIQTO1dFXP7rPaQ',
                input: text,
                region: 'VE'
            }
        });

        const { status, predictions } = data;

        if( status !== 'OK'  ){
            return {
                ok: false,
                message: 'No se encontraron resultados, por favor verifique que la ubicación sea correcta',
                data: []
            }
        }

        return {
            ok: true,
            data: filterCountry(predictions)
        }
    } catch (error) {
        
        return{
            ok: false, 
            message: error instanceof AxiosError && error.message || msg,
            data: []
        }
    }
}

//type Country = 'Venezuela' | 'venezuela' | string;

const filterCountry = (data: Prediction[] ,country: string = 'Venezuela') => {
   
    return data;
}