import { IUnit } from './IUnit';

export interface IKindsStats {
    [kind: string]: { start: number; unitCounts: number[] };
}
export interface IAppState<TUnit> {
    units: IUnit<TUnit>[];
    kindsStats: IKindsStats;
}
