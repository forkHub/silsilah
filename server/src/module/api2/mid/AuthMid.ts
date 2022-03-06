import express from "express";
import { config } from "../../silsilah/Config";
import { sm } from "../../silsilah/SilsilahModule";

export class AuthMid {
	checkAuthSession(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!sm.session(req).statusLogin) {
			if (config.loginCheck) {
				resp.status(401).send('');
			}
			else {
				next();
			}
		}
		else {
			next();
		}
	}
}