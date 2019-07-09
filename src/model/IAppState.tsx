import { IUnit } from './IUnit';

export interface IKindsStats {
    [kind: string]: number[];
}
export interface IAppState<TUnit> {
    units: IUnit<TUnit>[];
    kindsStats: IKindsStats;
}
