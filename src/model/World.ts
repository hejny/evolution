import { IUnit } from './IUnit';
import { randomElement } from 'src/utils/randomElement';

export class World<TUnit extends IUnit<TUnit>> {
    units: TUnit[] = [];

    addUnit(unit: TUnit) {
        this.units.push(unit);
    }

    randomBattle(): void {
        const unit1 = this.randomUnit();
        const unit2 = this.randomUnit();

        //if (unit1 === unit2) return this.randomBattle(); // FIXME: better - risk of infinity loop

        const result = unit1.battle(unit2);

        if (result === 1) {
            this.resultOfBattle(unit1, unit2);
        } else if (result === -1) {
            this.resultOfBattle(unit2, unit1);
        }
    }

    private resultOfBattle(winner: TUnit, looser: TUnit) {
        this.units = this.units.filter((unit) => unit !== looser);
        this.units.push(winner.clone());
    }

    private randomUnit(): TUnit {
        return randomElement(this.units);
    }
}
