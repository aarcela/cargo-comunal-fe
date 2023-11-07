import { createContext } from 'react';
import { User } from "../../interfaces/user";

type AuthContextProps = {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: (email: string, password: string) => Promise<{
        ok: Boolean; message?: string;
        id_user: number
    }>;
    logout: () => void;
    saveTokenFCM: (user_id: number, user_device_key?: string) => Promise<{ status: Boolean }>;
    FCM: string | undefined;
    id_user: number | undefined;
};


export const AuthContext = createContext({} as AuthContextProps);