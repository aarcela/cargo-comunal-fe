import { ComponentType } from "react";
import { Colors, IoniconsName } from "../../styles";

export type IconItem = {
    name: keyof typeof IoniconsName;
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    color?: keyof typeof Colors;
}

export type LabelItemStyle = {
    color?: keyof typeof Colors;
}

export interface RouteNavigation<T extends any>{
    name: string;
    icon?: IconItem;
    labelStyle?: LabelItemStyle;
    options?: T;
    component: ComponentType<{}>;
}