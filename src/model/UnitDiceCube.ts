import { IUnit, compareResult } from './IUnit';
import { number } from 'prop-types';
import { identity } from 'src/utils/identity';
import { randomElement, randomIndex } from 'src/utils/randomElement';
import * as uuid from 'uuid';

type UnitDiceCubeConfig = [number, number, number, number, number, number];

export class UnitDiceCube implements IUnit<UnitDiceCube> {
    static battle(unit1: UnitDiceCube, unit2: UnitDiceCube): compareResult {
        const roll1 = unit1.roll(),
            roll2 = unit2.roll();
        if (roll1 > roll2) {
            return 1;
        } else if (roll2 < roll1) {
            return -1;
        } else {
            return 0;
        }
    }

    public uuid = uuid.v4();

    constructor(public config: UnitDiceCubeConfig) {
        if (config.reduce((a, b) => a + b, 0) !== 21) {
            throw new Error(
                `Unit ${this.toString()} has not valid summary of 21.`,
            );
        }
    }

    get kind() {
        return `${this.config.sort().join('-')}`;
    }

    battle(unit2: UnitDiceCube): compareResult {
        return UnitDiceCube.battle(this, unit2);
    }

    roll(): number {
        return randomElement(this.config);
    }

    clone() {
        return new UnitDiceCube(this.config.map(
            identity,
        ) as UnitDiceCubeConfig);
    }

    createMutated() {
        const config = this.config.map(identity) as UnitDiceCubeConfig;

        const i1 = randomIndex(config);
        const i2 = randomIndex(config);

        config[i1]++;
        config[i2]--;

        return new UnitDiceCube(config);
    }

    toString() {
        return `[${this.config.join(',')}]`;
    }

    static createRandom(): UnitDiceCube {
        // TODO: Better
        return new UnitDiceCube([1, 2, 3, 4, 5, 6]);
    }

    // TODO: create All
}
