import { createContext } from 'react';
import { User } from "../../interfaces/user";

type AuthContextProps = {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: (email: string, password: string) => Promise<{ok: Boolean;message?: string;}>;
    logout: () => void;
    testSignIn: (user: User) => void;
};


export const AuthContext = createContext({} as AuthContextProps);