export interface UserEntity {
    first_name:         string;
    second_name?:       string;
    first_surname:      string;
    second_surname?:    string;
    phone:              string;
    ci:                 string;
    fecha_nc:           string;
    email:              string;
    username:           string;
    role:               'conductor' | 'solicitante' | 'administrador' | 'analista' | '';
}