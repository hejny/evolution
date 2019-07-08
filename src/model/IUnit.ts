export type compareResult = 1 | 0 | -1;

export interface IUnit<TUnit> {
    battle: (unit2: TUnit) => compareResult;
    // TODO: compare: (unit2: TUnit) => compareResult;
    clone: () => TUnit;
}
