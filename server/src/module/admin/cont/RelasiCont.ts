import express from "express";
import { RouterKOns } from "../../silsilah/RouterKons";
import { sm } from "../../silsilah/SilsilahModule";
import { util } from "../../Util";
// import { RouterKOns } from "../RouterKons";
// import { session } from "../SessionData";
// import { sm } from "../SilsilahModule";

export class RelasiCont {
	//TODO: dipindah ke pasangan cont atau di rename
	async renderTambahPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);

			let kunci: string = '-';
			let jmlAbs: number = 0;
			let hal: number = 0;
			// let where: string = sm.dao.anggota.where_jkl;
			let jkl: string = '';
			// let data: any[] = [];
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

			//daftar anggota
			if (anggota.jkl == 'l') {
				jkl = 'p';
			}
			else {
				jkl = 'l';
			}

			// if (("-" != kunci)) {
			// 	where = " WHERE jkl = ? AND (nama LIKE ? OR nama_lengkap LIKE ?)";
			// 	data = [jkl, '%' + kunci + '%', '%' + kunci + '%'];
			// }
			// else {
			// 	where = " WHERE jkl = ? ";
			// 	data = [jkl];
			// }

			//filter bani
			// where += ` AND bani = ? `;
			// data.push(session(_req).id);

			let anggotaAr: ISlAnggota[] = await sm.dao.pasangan.daftarCalonPasangan(kunci, offset, jkl);
			jmlAbs = (await sm.dao.pasangan.jmlCariPasangan(kunci, offset, jkl));

			let str: string = sm.render.pilihAnggota.render(
				anggotaAr,
				anggota,
				RouterKOns.p_anggota_id_rel_edit_id,
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