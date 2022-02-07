import { Router } from "express";
import {WarriorRecord} from "../records/warriorRecord";

export const hallOfGloryRouter = Router();

hallOfGloryRouter.get('/', async (req, res) => {
    const warriors = await WarriorRecord.getTopTenWarriors();
    res.render('hallOfGlory/main', {
        warriors,
    });
})