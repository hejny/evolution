import './Unit.css';
import * as React from 'react';
import { IUnit } from 'src/model/IUnit';
import { observer } from 'mobx-react';
import { IUnitStats } from 'src/model/IAppState';

interface IUnitProps {
    unit: IUnit<any>;
    unitStats: IUnitStats;
}

export const Unit = observer(({ unit, unitStats }: IUnitProps) => {
    const stat = unitStats[unit.uuid];

    return (
        <div className="Unit">
            <div className="config">{unit.toString()}</div>
            {stat && (
                <div className="stats">
                    <div className="age">{stat.age}</div>
                    <div className="born">{stat.born}</div>
                    <div className="died">{stat.died}</div>
                </div>
            )}
        </div>
    );
});
