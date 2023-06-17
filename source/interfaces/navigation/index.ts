import { ComponentType } from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Colors, IoniconsName } from "../../styles";

export type IconItem = {
    name: keyof typeof IoniconsName;
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    color?: keyof typeof Colors;
}

export type LabelItemStyle = {
    color?: keyof typeof Colors;
}

export interface RouteNavigation{
    name: string;
    icon?: IconItem;
    labelStyle?: LabelItemStyle;
    options?: BottomTabNavigationOptions;
    component: ComponentType<{}>;
}