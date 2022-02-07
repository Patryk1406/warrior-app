import {Request, Response} from "express";
import {Warrior} from "../types/warrior";
import {WarriorRecord} from "../records/warriorRecord";

export async function gettingWarriorFromRequest(req: Request, res: Response): Promise<Warrior | undefined> {
    const name = String(req.body.name);
    const strength = Number(req.body.strength);
    const defence = Number(req.body.defence);
    const stamina = Number(req.body.stamina);
    const agility = Number(req.body.agility);
    const warrior: Warrior = {name, strength, defence, stamina, agility};
    if (name.length <= 2 || name.length >= 25) {
        res.render('warriors/register', {
            message: 'The name of your warrior cannot be shorter than 2 chars and longer than 25 chars!',
            warrior
        });
        return;
    }
    if ((await WarriorRecord.getAllWarriorsNames()).includes(name)) {
        res.render('warriors/register', {
            message: 'A warrior with the name given by you already exists!',
            warrior
        });
        return
    }
    if (strength < 1 || defence < 1 || stamina < 1 || agility < 1) {
        res.render('warriors/register', {
            message: 'The value of any trait of your warrior cannot be lower than 0!',
            warrior
        });
        return;
    }
    if (strength + defence + stamina + agility !== 10) {
        res.render('warriors/register', {
            message: 'The combined value of your warrior\'s traits has to equal to 10!',
            warrior
        });
        return;
    }
    return warrior;
}