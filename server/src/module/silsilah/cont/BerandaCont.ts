import express from "express";
import { util } from "../../Util";
import { session } from "../SessionData";
import { sm } from "../SilsilahModule";

export class BerandaCont {

	async renderBerandaId(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt((_req).params.id);
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0]
			let hal: string;

			hal = sm.render.silsilah.render(anggota);

			resp.status(200).send(hal);

		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderBeranda(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = session(_req).defId;
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0]
			let hal: string;

			console.debug('def id ' + id);

			hal = sm.render.silsilah.render(anggota);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async lihatProfileAnggota(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);
			let hal: string;
			let anggota: ISlAnggota = await sm.ent.anggota.populate(id);
			await sm.ent.kerabat.muat(anggota);

			hal = sm.render.web.profile.render(anggota);

			resp.status(200).send(hal);
		} catch (e) {
			util.respError(resp, e);
		}
	}


}