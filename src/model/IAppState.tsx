import { IUnit } from './IUnit';

export interface IUnitStats {
    [uuid: string]: {
        age: number;
        born: number;
        died: number | null;
    };
}
export interface IAppState<TUnit> {
    units: IUnit<TUnit>[];
    unitStats: IUnitStats;
}

export function defaultUnitStats(born: number) {
    return {
        age: 0,
        born,
        died: null,
    };
}
