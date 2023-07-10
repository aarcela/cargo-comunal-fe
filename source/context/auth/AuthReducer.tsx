import { User } from "../../interfaces/user";

export interface AuthState {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated' ;
};

type AuthAction = 
    | { type: 'login', payload: User }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: 'checking' }


// generaEstado
export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch ( action.type ) {        
        case 'login':
            return {
                ...state,
                status: 'authenticated',
                user: action.payload
            }
        case 'checking':
            return {
                ...state,
                status: 'checking',
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                user: null
            }

        default:
            return state;
    }
}