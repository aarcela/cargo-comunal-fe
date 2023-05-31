import React from "react";
import { UserEntity } from "../../interfaces";

export interface InterfaceStepUser{
    objUser: UserEntity;
    setObjUser: React.Dispatch<React.SetStateAction<UserEntity>>;
    next: (value: keyStep) => void | null;
    prev: (value: keyStep) => void;
}

type keyStep = 'profile' | 'personal';
