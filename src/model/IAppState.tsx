import { IUnit } from './IUnit';

export interface IAppState<TUnit> {
    units: IUnit<TUnit>[];
}
