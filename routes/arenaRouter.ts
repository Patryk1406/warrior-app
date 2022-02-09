import {Router} from "express";
import {Arena} from "../repositories/arena";
import {WarriorRecord} from "../records/warriorRecord";

export const arenaRouter = Router();



arenaRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.getAll();
        res.render('arena/main', {
            warriors
        });
})
    .get('/result', async (req, res) => {
    const {firstWarriorId, secondWarriorId} = req.body;
    const firstWarrior = await WarriorRecord.getOne(firstWarriorId);
    const secondWarrior = await WarriorRecord.getOne(secondWarriorId);
    const arena = new Arena(firstWarriorId, secondWarriorId);
    const descriptionOfTheFight = await arena.fight();
    res.render('arena/fightResult', {
        descriptionOfTheFight,
    })
})