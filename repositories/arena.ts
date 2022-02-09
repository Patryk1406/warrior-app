import {WarriorRecord} from "../records/warriorRecord";

export class Arena {
    private _description: string;
    private _attacker: WarriorRecord;
    private _defender: WarriorRecord;

    constructor(private readonly _warrior1: WarriorRecord, private readonly _warrior2: WarriorRecord) {
        this.attacker = Math.round(Math.random()) ? this.warrior1 : this.warrior2;
        this.defender = this.attacker === this.warrior1 ? this.warrior2 : this.warrior1;
    }

    get warrior1(): WarriorRecord {
        return this._warrior1;
    }

    get warrior2(): WarriorRecord {
        return this._warrior2;
    }

    get description(): string {
        return this._description;
    }

    get defender(): WarriorRecord {
        return this._defender;
    }

    get attacker(): WarriorRecord {
        return this._attacker;
    }

    set description(value: string) {
        this._description = value;
    }

    set attacker(value: WarriorRecord) {
        this._attacker = value;
    }

    set defender(value: WarriorRecord) {
        this._defender = value;
    }

    descriptionUpdate(message: string): void {
        this.description = this.description ? this.description + '\n' + message : message;
    }

     async fight(): Promise<string> {
        const duckMessage = `The warrior ${this.defender.name} has ducked but before... the competitor has managed to hurt him slightly!`
        const shieldMessage = `The warrior ${this.defender.name} got hit but he has managed to cover himself with the shield so only it is a little bit broken..`;

        if (this.defender.shield + this.defender.agility <= this.attacker.strength) {
            if (this.defender.shield < this.attacker.strength) {
                const difference = this.attacker.strength - this.defender.shield;
                const hitMessage = `The warrior ${this.defender.name} got hit and the blow took him ${difference} hp!`
                this.defender.shield = 0;
                this.defender.hp -= difference;
                this.descriptionUpdate(hitMessage);
                if (this.defender.hp <= 0) {
                    return this.victory();
                }
            }
            else {
                this.defender.shield -= this.attacker.strength;
                this.descriptionUpdate(shieldMessage);
            }
        }
        else {
            this.descriptionUpdate(duckMessage);
            this.defender.shield > 0 ? this.defender.shield -= 1 : this.defender.hp -= 1;
            if (this.defender.hp <= 0) {
                return this.victory();
            }
        }
         this.attacker = this.defender;
         this.defender =  this.attacker === this.warrior1 ? this.warrior2 : this.warrior1;
         await this.fight();
    }

    async victory(): Promise<string> {
        this.description += `\nThe warrior ${this.defender.name} has died and thee winner is ${this.attacker.name}!`;
        this.attacker.victoriesCount += 1;
        await this.attacker.insert();
        return this.description;
    }

}

const arena= new Arena(new WarriorRecord(2, 'Jan', 3, 3, 2), new WarriorRecord(1, 'Wiesław', 3, 3, 3));
// console.log(arena.description)
arena.fight();