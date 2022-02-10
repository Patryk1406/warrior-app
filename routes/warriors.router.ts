import {Router} from "express";
import {gettingWarriorFromRequest} from "../utils/getting-warrior-from-request";
import {Warrior} from "../types/warrior";
import {WarriorRecord} from "../records/warrior.record";

export const warriorsRouter = Router();

warriorsRouter.get('/', (req, res) => {
    res.render('warriors/register');
})
    .post('/', async (req, res) => {
        const warrior = await gettingWarriorFromRequest(req, res);
        if (!warrior) {
            return
        }
        const {name, agility, stamina, strength, defence}: Warrior = warrior;
        const warriorRecord = new WarriorRecord(agility, name, stamina, strength, defence);
        await warriorRecord.insert();
        res.status(201).render('warriors/thanks');
    })
