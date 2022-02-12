import express from "express";
import { sql } from "../Sql";
import { util } from "../Util";
import { config } from "./Config";

class Api {
	readonly router = express.Router();

	mapRouter(): void {
		console.debug('api router');

		this.router.post("/api", (req: express.Request, resp: express.Response) => {
			try {
				if (!config.dev) throw Error('dev');

				sql.query(req.body.api, []).then((h) => {
					h;
					resp.status(200).send(h);
				}).catch((e) => {
					util.respError(resp, e);
				});
			}
			catch (e) {
				util.respError(resp, e);
			}
		});

		this.router.get("/api/contact", (req: express.Request, resp: express.Response) => {
			try {
				req;
				resp.status(200).send("ok");
			}
			catch (e) {
				util.respError(resp, e);
			}
		});
	}
}

export var api: Api = new Api();

