import md5 from "blueimp-md5";
import express from "express";
import { util } from "../../Util";
import { RouterKOns } from "../RouterKons";
import { session } from "../SessionData";
import { sm } from "../SilsilahModule";

export class AuthController {

	async renderLogin(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			resp.status(200).send(sm.render.auth.login.render());
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async login(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let userName: string = _req.body.user_name;
			let password: string = md5(_req.body.password);

			let hasil: ISlAdmin[] = await sm.dao.auth.login(userName, password);

			if (!hasil || hasil.length == 0) {
				console.log('username: ' + userName + '/pass: ' + password);
				throw Error('user name atau password salah');
			}

			let admin: ISlAdmin = hasil[0];

			session(_req).defId = admin.def_id;
			session(_req).id = admin.id;
			session(_req).statusLogin = true;

			resp.status(200).send(admin.def_id + '');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async logout(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			_req.session = null;
			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//check auth middle ware
	checkAuthGet(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!sm.session(req).statusLogin) {
			resp.status(401).redirect(RouterKOns.gp_auth_login);
		}
		else {
			next();
		}
	}

	//TODO: masukin config buat bypass auth
	checkAuthSession(req: express.Request, resp: express.Response, next: express.NextFunction) {
		if (!sm.session(req).statusLogin) {
			// resp.status(401).send('belum login');
			resp;
			next();
		}
		else {
			next();
		}
	}

}

export var authController: AuthController = new AuthController();

