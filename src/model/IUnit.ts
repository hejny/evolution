export type compareResult = 1 | 0 | -1;

export interface IUnit<TUnit> {
    kind: string;
    uuid: string;
    battle: (unit2: TUnit) => compareResult;
    // TODO: compare: (unit2: TUnit) => compareResult;
    clone: () => TUnit;
}
