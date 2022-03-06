import express from "express";
// import { RouterKOns } from "../../silsilah/RouterKons";
import { sm } from "../../silsilah/SilsilahModule";
import { util } from "../../Util";
import { cont } from "../cont/Cont";
import { RouterAPI2Kons } from "../RouterAPI2Kons";

export class AnggotaRouter {
	router(router: express.Router) {
		router.post(RouterAPI2Kons.api_profile_lihat, sm.auth.checkAuthGet, (_req: express.Request, resp: express.Response) => {
			try {
				console.log('profile lihat');
				let id: number = parseInt(_req.body.id);
				cont.anggota.lihatProfileAnggota(id).then((anggota: ISlAnggota) => {
					anggota; //TODO:
					console.log('anggota');
					resp.status(200).send('');
				}).catch((e) => {
					util.respError(resp, e);
				});
			} catch (e) {
				util.respError(resp, e);
			}
		})
	}
}
