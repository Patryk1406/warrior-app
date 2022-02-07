import * as express from 'express';
import {gettingWarriorFromRequest} from "../utils/gettingWarriorFromRequest";

export const warriorsRouter = express.Router();

warriorsRouter.get('/', (req, res) => {
    res.render('warriors/register');
})
    .post('/', (req, res) => {
        const warrior = gettingWarriorFromRequest(req, res);
        if (warrior) {

        }
    })
