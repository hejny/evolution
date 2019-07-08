import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { Unit } from '../Unit/Unit';

interface IAppProps {
    appState: IAppState<any> & IObservableObject;
}

export const Root = observer(({ appState }: IAppProps) => (
    <div className="Root">
        {appState.units.map((unit) => (
            <Unit {...{ unit }} />
        ))}
    </div>
));
