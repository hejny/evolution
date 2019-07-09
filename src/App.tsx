import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState, defaultUnitStats } from './model/IAppState';
import { IObservableObject, observable } from 'mobx';
import { Root } from './view/Root/Root';
import { UnitDiceCube } from './model/UnitDiceCube';
import { World } from './model/World';
import { IUnit } from './model/IUnit';
import { forAnimationFrame, forTime } from 'waitminute';

export class App {
    constructor(private rootElement: HTMLDivElement) {}

    public world: World<UnitDiceCube>;
    public appState: IAppState<UnitDiceCube> & IObservableObject;

    async run() {
        this.world = new World<UnitDiceCube>();
        this.appState = observable({
            units: [] as IUnit<UnitDiceCube>[],
            unitStats: {},
        });

        // TODO: DRY
        for (let i = 0; i < 10; i++) {
            const unit = UnitDiceCube.createRandom();
            this.world.units.push(unit);
            this.appState.unitStats[unit.uuid] = defaultUnitStats(0);
        }

        ReactDOM.render(
            <Root {...{ appState: this.appState }} />,
            this.rootElement,
        );

        for (let year = 0; year < 100; year++) {
            const { died, born } = this.world.randomBattle();

            for (const diedUnit of died) {
                this.appState.unitStats[diedUnit.uuid].died = year;
            }

            for (const bornUnit of born) {
                this.appState.unitStats[bornUnit.uuid] = defaultUnitStats(year);
            }

            this.appState.units = this.world.units;

            for (const unit of this.appState.units) {
                this.appState.unitStats[unit.uuid].age++;
            }

            await forTime(1000000);
            await forAnimationFrame();
        }
    }
}
