import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState, IKindsStats } from './model/IAppState';
import { IObservableObject, observable } from 'mobx';
import { Root } from './view/Root/Root';
import { UnitDiceCube } from './model/UnitDiceCube';
import { World } from './model/World';
import { IUnit } from './model/IUnit';
import { forAnimationFrame, forTime } from 'waitasecond';

export class App {
    constructor(private rootElement: HTMLDivElement) {}

    public world: World<UnitDiceCube>;
    public appState: IAppState<UnitDiceCube> & IObservableObject;

    async run() {
        this.world = new World<UnitDiceCube>();
        this.appState = observable({
            units: [] as IUnit<UnitDiceCube>[],
            kindsStats: {},
        });

        // TODO: DRY
        for (let i = 0; i < 10; i++) {
            const unit = UnitDiceCube.createRandom();
            this.world.units.push(unit);
        }

        ReactDOM.render(
            <Root {...{ appState: this.appState }} />,
            this.rootElement,
        );

        for (let year = 0; year < 100; year++) {
            const yearKindsStats: { [kind: string]: number } = {};

            for (const unit of this.appState.units) {
                yearKindsStats[unit.kind] = yearKindsStats[unit.kind] || 0;
                yearKindsStats[unit.kind]++;
            }

            for (const kind of Object.keys(yearKindsStats)) {
                this.appState.kindsStats[kind] = this.appState.kindsStats[
                    kind
                ] || { start: year, unitCounts: [] };
                this.appState.kindsStats[kind].unitCounts.push(
                    yearKindsStats[kind],
                );
            }

            const { died, born } = this.world.randomBattle();

            /*
            for (const diedUnit of died) {
                this.appState.kindsStats[diedUnit.uuid].died = year;
            }

            for (const bornUnit of born) {
                this.appState.kindsStats[bornUnit.uuid] = defaultUnitStats(
                    year,
                );
            }*/

            this.appState.units = this.world.units;

            /*
            for (const unit of this.appState.units) {
                this.appState.kindsStats[unit.uuid].age++;
            }
            */

            await forTime(1000);
            await forAnimationFrame();
        }
    }
}
