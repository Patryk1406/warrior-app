import {ObjectId, WithId} from 'mongodb';
import {db} from "../database/db";
import {InvalidDataError} from "../utils/error";
import { WarriorToDatabase} from "../types/warrior";


const collection = db.collection('warriors');

export class WarriorRecord {
    private _victoriesCount: number;
    private readonly _id: ObjectId
    private _hp: number;
    private _shield: number
    constructor(private readonly _agility: number,
                private readonly _name: string,
                private readonly _stamina: number,
                private readonly _strength: number,
                private readonly _defence: number,
                id?: ObjectId,
                victoriesCount?: number,
                ) {
        this._id = id ?? new ObjectId();
        this._victoriesCount = victoriesCount ?? 0;
        this._hp = this.stamina * 10;
        this._shield = this.defence
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

    get hp(): number {
        return this._hp;
    }

    get shield(): number {
        return this._shield;
    }

    set victoriesCount(value: number) {
        this._victoriesCount = value;
    }

    set hp(value: number) {
        this._hp = value;
    }

    set shield(value: number) {
        this._shield = value;
    }

    static async getAll(): Promise<WarriorRecord[]> {
       const warriors = (await collection.find().toArray()) as WithId<WarriorRecord>[];
       return warriors.map(warrior => new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id, warrior.victoriesCount));
    }

    static async getOne(id: string): Promise<WarriorRecord> {
        const objectId = new ObjectId(id);
        const warrior = await collection.find({_id: objectId}).next() as WithId<WarriorRecord> | null;
        if (!warrior) {
            throw new InvalidDataError('Error, a warrior with the given id doesn\'t exist')
        }
        return new WarriorRecord(warrior.agility, warrior.name, warrior.stamina, warrior.strength, warrior.defence, warrior._id, warrior.victoriesCount);
    }

    static async getTopWarriors(howManyTop: number): Promise<{name: string, victoriesCount: number}[]> {
        const warriors = await collection.find<{name: string, victoriesCount: number}>({},
            {projection: {_id: 0, name: 1, victoriesCount: 1},
                    sort: {victoriesCount: -1},
                    limit: Number(howManyTop),
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
        } as WarriorToDatabase)
        return this.id;
    }

    async update(): Promise<ObjectId> {
        await collection.updateOne({_id: this.id}, {
            $set: {
                victoriesCount: Number(this.victoriesCount),
            },
        })
        return this.id;
    }
}