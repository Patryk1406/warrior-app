import {ObjectId} from "mongodb";

export interface Warrior {
    name: string;
    strength: number;
    defence: number;
    stamina: number;
    agility: number;
}

export interface WarriorToDatabase {
    _id: ObjectId;
    name: string;
    strength: number;
    defence: number;
    stamina: number;
    agility: number;
    victoriesCount: number;
}