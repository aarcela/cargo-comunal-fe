export interface DataLocationGooglePlace extends ResultSearchGoogleAutocomplete{
    postal: string | null;
    location: {
      lat: number;
      lng: number;
    }
}

export interface ResultSearchGoogleAutocomplete{
    place_id:              string;
    main_text:             string;
    secondary_text:        string;
    description:           string;
}