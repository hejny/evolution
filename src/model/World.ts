import { Unit } from './../view/Unit/Unit';
import { IUnit } from './IUnit';
import { randomElement } from 'src/utils/randomElement';

interface IWorldBattleResult<TUnit extends IUnit<TUnit>> {
    born: TUnit[];
    died: TUnit[];
}

export class World<TUnit extends IUnit<TUnit>> {
    units: TUnit[] = [];

    addUnit(unit: TUnit) {
        this.units.push(unit);
    }

    randomBattle(): IWorldBattleResult<TUnit> {
        const unit1 = this.randomUnit();
        const unit2 = this.randomUnit();

        //if (unit1 === unit2) return this.randomBattle(); // FIXME: better - risk of infinity loop

        const result = unit1.battle(unit2);

        if (result === 1) {
            return this.resultOfBattle(unit1, unit2);
        } else if (result === -1) {
            return this.resultOfBattle(unit2, unit1);
        }

        return { died: [], born: [] };
    }

    private resultOfBattle(
        winner: TUnit,
        looser: TUnit,
    ): IWorldBattleResult<TUnit> {
        this.units = this.units.filter((unit) => unit !== looser);
        const born = winner.createMutated();
        this.units.push(born);
        return { born: [born], died: [looser] };
    }

    private randomUnit(): TUnit {
        return randomElement(this.units);
    }
}
