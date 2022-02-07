import { ObjectId, WithId} from 'mongodb';
import {db} from "../database/db";


const collection = db.collection('warriors');

export class WarriorRecord {
    private _victoriesCount: number = 0
    private readonly _id: ObjectId
    constructor(private readonly _agility: number,
                private readonly _name: string,
                private readonly _stamina: number,
                private readonly _strength: number,
                private readonly _defence: number,
                id?: ObjectId) {
        this._id = id ?? new ObjectId();
    }
    get id(): ObjectId {
        return this._id;
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

    get victoriesCount(): number {
        return this._victoriesCount;
    }

    set victoriesCount(value: number) {
        this._victoriesCount = value;
    }

    static async getAll(): Promise<WarriorRecord[]> {
       const warriors = (await collection.find().toArray()) as WithId<WarriorRecord>[];
       console.log(warriors);
       return warriors.map(warrior => new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id));
    }

    static async getOne(id: ObjectId): Promise<WarriorRecord> {
        const warrior = await collection.find({_id: id}).next() as WithId<WarriorRecord>;
        return new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id);
    }

    static async getTopTenWarriors(): Promise<{name: string, victoriesCount: number}[]> {
        const warriors = await collection.find<{name: string, victoriesCount: number}>({},
            {projection: {_id: 0, name: 1, victoriesCount: 1},
                    sort: {victoriesCount: -1},
                    limit: 10,
                    }).toArray();
        return warriors

    }

    static async getAllWarriorsNames(): Promise<string[]> {
        const names: string[] = []
        const cursor = await collection.find<{name: string }>({}, {projection: {_id: 0, name: 1}});
        for await (const document of cursor){
            names.push(document.name);
        }
        return names;
    }

    async insert(): Promise<ObjectId> {
        await collection.insertOne({
            _id: this.id,
            name: this.name,
            agility: this.agility,
            stamina: this.stamina,
            strength: this.strength,
            defence: this.defence,
            victoriesCount: this.victoriesCount
        })
        return this.id;
    }
}

WarriorRecord.getTopTenWarriors();