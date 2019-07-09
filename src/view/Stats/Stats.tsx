import './Stats.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IKindsStats } from 'src/model/IAppState';

interface IStatsProps {
    stats: IKindsStats;
}

export const Stats = observer(({ stats }: IStatsProps) => {
    return (
        <div className="Stats">
            {Object.keys(stats).map((kind) => {
                const stat = stats[kind];
                return (
                    <div key={kind}>
                        <h1>{kind}</h1>

                        {stat.join(',')}
                    </div>
                );
            })}
        </div>
    );
});
