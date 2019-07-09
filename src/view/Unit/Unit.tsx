import './Unit.css';
import * as React from 'react';
import { IUnit } from 'src/model/IUnit';
import { observer } from 'mobx-react';

interface IUnitProps {
    unit: IUnit<any>;
}

export const Unit = observer(({ unit }: IUnitProps) => {
    return (
        <div className="Unit">
            <div className="config">{unit.toString()}</div>
        </div>
    );
});
