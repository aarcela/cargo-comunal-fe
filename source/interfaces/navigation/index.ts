import { ComponentType } from "react";
import { RouteConfigComponent, ParamListBase, RouteProp } from '@react-navigation/native'
import { Colors, IoniconsName } from "../../styles";

export type IconItem = {
    name: keyof typeof IoniconsName;
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    color?: keyof typeof Colors;
}

export type LabelItemStyle = {
    color?: keyof typeof Colors;
}

export interface RouteNavigation<T extends any,  ParamList extends ParamListBase, RouteName extends keyof ParamList>{
    name: string;
    icon?: IconItem;
    labelStyle?: LabelItemStyle;
    options?: T;
    component: ScreenComponentType<ParamList, RouteName>
}

type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: any;
    }>
  | React.ComponentType<{}>;