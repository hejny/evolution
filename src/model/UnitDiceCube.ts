import { IUnit, compareResult } from './IUnit';
import { number } from 'prop-types';
import { identity } from 'src/utils/identity';
import { randomElement } from 'src/utils/randomElement';

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

    constructor(public config: UnitDiceCubeConfig) {
        if (config.reduce((a, b) => a + b, 0) !== 21) {
            throw new Error(
                `Unit ${this.toString()} has not valid summary of 21.`,
            );
        }
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

    toString() {
        return `[${this.config.join(',')}]`;
    }

    static createRandom(): UnitDiceCube {
        return new UnitDiceCube([1, 2, 3, 4, 5, 6]);
    }

    // TODO: createMutated(): DiceCube {}
    // TODO: create All
}
