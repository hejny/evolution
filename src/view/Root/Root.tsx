import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { Unit } from '../Unit/Unit';
import { Stats } from '../Stats/Stats';

interface IAppProps {
    appState: IAppState<any> & IObservableObject;
}

export const Root = observer(({ appState }: IAppProps) => (
    <div className="Root">
        <h1>Kinds</h1>
        <Stats {...{ stats: appState.kindsStats }} />
        <h1>Units</h1>
        {appState.units.map((unit) => (
            <Unit {...{ key: unit.uuid, unit }} />
        ))}
    </div>
));
