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
            <svg width={500} height={300} viewBox="0 0 500 300">
                {Object.keys(stats).map((kind) => {
                    const stat = stats[kind];
                    return (
                        <polyline
                            points={stat.unitCounts
                                .map((v, i) => `${i},${300 - (v / 10) * 300}`)
                                .join(' ')}
                            fill="none"
                            stroke="black"
                            stroke-width="3"
                        />
                    );
                })}

                {/*Object.keys(stats).map((kind) => {
                const stat = stats[kind];
                return (
                    <div key={kind}>
                        <h1>{kind}</h1>

                        {stat.unitCounts.join(',')}
                    </div>
                );
            })*/}
            </svg>
        </div>
    );
});
