import express from "express";
import { sm } from "../../silsilah/SilsilahModule";

export class AuthMid {
    checkAuthGet(req: express.Request, resp: express.Response, next: express.NextFunction) {
        if (!sm.session(req).statusLogin) {
            resp.status(401).send('');
        }
        else {
            next();
        }
    }
}