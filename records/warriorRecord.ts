import {Collection, ObjectId, WithId} from 'mongodb';
import {v4 as uuid} from 'uuid';
import {Warrior} from "../types/warrior";
import {db} from "../database/db";


const collection = db.collection('warriors');

export class WarriorRecord implements Warrior {
    private readonly id: ObjectId
    constructor(private readonly _agility: number,
                private readonly _name: string,
                private readonly _stamina: number,
                private readonly _strength: number,
                private readonly _defence: number,
                id?: ObjectId) {
        this.id = id ? new ObjectId(id) : new ObjectId(uuid());
    }

    get agility(): number {
        return this._agility;
    }

    get name(): string {
        return this._name;
    }

    get stamina(): number {
        return this._stamina;
    }

    get strength(): number {
        return this._strength;
    }

    get defence(): number {
        return this._defence;
    }

    static async getAll(): Promise<WarriorRecord[]> {
       const warriors = (await collection.find().toArray()) as WithId<WarriorRecord>[];
       console.log(warriors);
       return warriors.map(warrior => new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id));
    }

    static async getOne(id: ObjectId) {
        const warrior = await collection.find({_id: id}).next();
        return new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id);
    }
}