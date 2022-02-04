import express from "express";
import { util } from "../../Util";
// import { config } from "../Config";
import { RouterKOns } from "../RouterKons";
import { session } from "../SessionData";
import { sm } from "../SilsilahModule";

export class RelasiCont {

	//TODO: abs
	async renderTambahPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);

			let kunci: string = '-';
			let jmlAbs: number = 0;
			let hal: number = 0;
			let where: string = sm.dao.anggota.where_jkl;
			// let select: string = sm.dao.anggota.select_profile;
			// let order: string = sm.dao.anggota.order_nama;
			let jkl: string = '';
			let data: any[] = [];
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
			// if (anggota.jkl == 'l') {
			// 	jkl = 'p';
			// }
			// else {
			// 	jkl = 'l';
			// }

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

			//let anggotaAr: ISlAnggota[] = await sm.dao.anggota.baca(select, where, hal * config.jmlPerHal, order, data);
			let anggotaAr: ISlAnggota[] = await sm.dao.pasangan.daftarCalonPasangan(kunci, offset, session(_req).id, jkl);

			jmlAbs = (await sm.dao.anggota.jmlWhere(
				where,
				data
			)).jumlah;

			let str: string = sm.render.pilihAnggota.render(
				anggotaAr,
				anggota,
				RouterKOns.p_anggota_id_rel_edit_id,
				RouterKOns.g_anggota_id_calon_pas_cari_kunci_hal,
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