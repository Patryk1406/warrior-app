import * as express from 'express';
import {gettingWarriorFromRequest} from "../utils/gettingWarriorFromRequest";
import {Warrior} from "../types/warrior";
import {WarriorRecord} from "../records/warriorRecord";

export const warriorsRouter = express.Router();

warriorsRouter.get('/', (req, res) => {
    res.render('warriors/register');
})
    .post('/', async (req, res) => {
        const warrior = gettingWarriorFromRequest(req, res);
        if (!warrior) {
            return
        }
        const {name, agility, stamina, strength, defence}: Warrior = warrior;
        const warriorRecord = new WarriorRecord(agility, name, stamina, strength, defence);
        await warriorRecord.insert();
        res.render('warriors/thanks');
    })
