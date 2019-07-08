import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
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
        });

        for (let i = 0; i < 10; i++) {
            this.appState.units.push(UnitDiceCube.createRandom());
        }

        ReactDOM.render(
            <Root {...{ appState: this.appState }} />,
            this.rootElement,
        );

        while (true) {
            this.world.randomBattle();

            await forTime(1000);
            await forAnimationFrame();
        }
    }
}
