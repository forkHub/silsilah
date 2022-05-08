import express from "express";
import { util } from "../../Util";
import { RouterKOns } from "../RouterKons";
import { sm } from "../SilsilahModule";

export class PasanganCont {

	async renderCariPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);

			let kunci: string = '-';
			let jmlAbs: number = 0;
			let hal: number = 0;
			let jkl: string = '';
			let offset: number = 0;

			//parameter bila ada
			if (_req.params.kunci) kunci = _req.params.kunci;
			if (_req.params.hal) hal = parseInt(_req.params.hal);

			//buat relasi bila belum ada
			let anggota: ISlAnggota = (await sm.dao.anggota.lihat(id))[0];
			if (anggota.rel_id == 0) {
				anggota.rel_id = (await sm.dao.rel.baru()).insertId;
				await sm.dao.anggota.updateRel(anggota.id, anggota.rel_id);
			}

			//daftar anggota filter berdasarkan jkl
			if (anggota.jkl == 'l') {
				jkl = 'p';
			}
			else {
				jkl = 'l';
			}

			let anggotaAr: ISlAnggota[] = await sm.dao.pasangan.daftarCalonPasangan(kunci, offset, jkl);
			jmlAbs = (await sm.dao.pasangan.jmlCariPasangan(kunci, offset, jkl));

			let str: string = sm.admin.render.pilihAnggotaGenerik.render(
				anggotaAr,
				anggota,
				RouterKOns.editRelasi,
				RouterKOns.halCariPasanganFilter,
				'pilih pasangan:',
				kunci,
				jmlAbs,
				hal);

			resp.status(200).send(str);
		} catch (e) {
			util.respError(resp, e);
		}
	}
}