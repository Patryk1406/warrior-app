import {Router} from "express";
import {Arena} from "../libs/arena";
import {WarriorRecord} from "../records/warrior.record";

export const arenaRouter = Router();



arenaRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.getAll();
        res.render('arena/arena-form', {
            warriors
        });
})
    .post('/fight', async (req, res) => {

        const {firstWarriorId, secondWarriorId} = req.body;
        if (firstWarriorId === secondWarriorId) {
            const warriors = await WarriorRecord.getAll()
            res.render('arena/arena-form', {
            warriors,
            message: 'The warrior cannot fight with himself',
        })
            return;
        }
        const firstWarrior = await WarriorRecord.getOne(firstWarriorId);
        const secondWarrior = await WarriorRecord.getOne(secondWarriorId);
        const arena = new Arena(firstWarrior, secondWarrior);
        const fightDescription = await arena.fight();
        res.render('arena/fight-result', {
            fightDescription,
        })
})