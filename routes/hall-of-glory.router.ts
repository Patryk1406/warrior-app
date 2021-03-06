import { Router } from "express";
import {WarriorRecord} from "../records/warrior.record";

export const hallOfGloryRouter = Router();

hallOfGloryRouter.get('/', async (req, res) => {
    const warriors = await WarriorRecord.getTopWarriors(10);
    res.render('hallOfGlory/list-of-warriors', {
        warriors,
    });
})