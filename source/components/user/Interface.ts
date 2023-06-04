import React from "react";
import { UserEntity } from "../../interfaces";

export interface InterfaceStepUser{
    objUser: UserEntity;
    setObjUser: (values: any) => void | null;
    next: (value: keyStep) => void | null;
    prev: (value: keyStep) => void;
}

type keyStep = 'profile' | 'personal' | 'extra';
