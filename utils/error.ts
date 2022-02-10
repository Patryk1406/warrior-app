import {NextFunction, Request, Response} from "express";

export class InvalidDataError extends Error {}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    let status;
    let message;
    if(err instanceof InvalidDataError) {
        status = 400;
        message = err.message;
    } else {
        status = 500;
        message = 'We have some problems with the server, please try again in a few minute.'
    }
    res.status(status).render('errors/error', {
        message
    })
}