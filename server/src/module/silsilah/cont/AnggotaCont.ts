import fs from "fs";
import express from "express";
import { util } from "../../Util";
import { v } from "../../Validator";
import { config } from "../Config";
import { RouterKOns } from "../RouterKons";
import { sm } from "../SilsilahModule";
import { session } from "../SessionData";
import { Kons } from "../../Kons";

export class AnggotaCont {

	async renderDaftarAnggota(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.cariAnggota('---', 0, session(_req).id, Kons.CARI_NORMAL);
			let jml: number = (await sm.dao.anggota.jmlCariAnggota('---', session(_req).id, Kons.CARI_NORMAL)).jumlah;

			let hal: string = sm.render.daftarAnggota.render(anggotaAr, 0, jml, '---', RouterKOns.g_anggota_daftar_kunci_hal);
			resp.status(200).send(hal);

		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderEditBerandaById(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let id: number = parseInt(_req.params.id);
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0]
			let hal: string;

			//pasangan info
			if (anggota.rel_id > 0) {
				let pasAr: ISlAnggota[] = await sm.dao.pasangan.lihatPasangan(anggota.id, anggota.rel_id);
				let pas: ISlAnggota = pasAr[0];
				anggota.pas = pas;
				anggota.rel = (await sm.dao.rel.byId(anggota.rel_id))[0];
				anggota.anak = (await sm.dao.anak.daftarAnak(anggota.rel_id))
			}
			else {
				anggota.anak = [];
			}

			hal = sm.render.editBeranda.render(anggota);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderEditProfileAnggota(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let id: number = parseInt(_req.params.id);
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0];


			let hal: string = sm.render.editProfileAnggota.render(anggota);

			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderAnakBaru(_req: express.Request, resp: express.Response): Promise<void> {
		let anggotaAr: ISlAnggota[] = await sm.dao.anggota.cariAnggota("-", 0, session(_req).id, Kons.CARI_NORMAL);
		let jml: number = (await sm.dao.anggota.jmlCariAnggota("---", session(_req).id, Kons.CARI_NORMAL)).jumlah
		let anggota: ISlAnggota = (await sm.dao.anggota.lihat(parseInt(_req.params.id)))[0];

		let hal: string = sm.render.pilihAnggota.render(
			anggotaAr,
			anggota,
			RouterKOns.p_anggota_id_ortu_edit_id,
			RouterKOns.g_anggota_id_anak_tambah_kunci_hal,
			'pilih anak',
			"-",
			jml,
			0);

		resp.status(200).send(hal);
	}

	async renderAnakBaruCari(_req: express.Request, resp: express.Response): Promise<void> {
		let id: number = parseInt(_req.params.id);
		let kunci: string = decodeURI(_req.params.kunci);
		let anggota: ISlAnggota = (await sm.dao.anggota.lihat(id))[0];
		let select: string = sm.dao.anggota.select_profile;
		let where: string = sm.dao.anggota.where_semua;
		let order: string = sm.dao.anggota.order_nama;
		let offsetLog: number = parseInt(_req.params.hal);
		let jml: number = (await sm.dao.anggota.jmlCariAnggota(kunci, session(_req).id, Kons.CARI_NORMAL)).jumlah;
		let kunciSql: string = '%' + kunci + '%';

		if (!kunci || "-" == kunci) {
			where = sm.dao.anggota.where_semua;
		}
		else {
			where = sm.dao.anggota.where_cari;
		}

		//fiter bani
		where += " AND bani = ? "

		let anggotaAr: ISlAnggota[] = await sm.dao.anggota.baca(select, where, offsetLog * config.jmlPerHal, order, [kunciSql, kunciSql, session(_req).id]);

		let hal: string = sm.render.pilihAnggota.render(anggotaAr, anggota, RouterKOns.p_anggota_id_ortu_edit_id, RouterKOns.g_anggota_id_anak_tambah_kunci_hal, 'pilih anak', kunci, jml, offsetLog);

		resp.status(200).send(hal);
	}

	async renderDaftarAnggotaCari(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let kunci: string = decodeURI(_req.params.kunci);
			let hal: number = parseInt(_req.params.hal);
			let jml: number = (await sm.dao.anggota.jmlCariAnggota(kunci, session(_req).id, Kons.CARI_NORMAL)).jumlah;
			let offsetAbs: number = hal * config.jmlPerHal;
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.cariAnggota(kunci, offsetAbs, session(_req).id, Kons.CARI_NORMAL);

			let str: string = sm.render.daftarAnggota.render(anggotaAr, hal, jml, kunci, RouterKOns.g_anggota_daftar_kunci_hal);

			resp.status(200).send(str);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async renderAnggotaBaru(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let hal: string = sm.render.anggotaBaru.render();
			resp.status(200).send(hal);
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	//API
	async lihatPasangan(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let id: number = parseInt(_req.params.id);
			let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
			let anggota: ISlAnggota = anggotaAr[0];
			let pasangan: ISlAnggota[] = [];

			if (anggota.rel_id == 0) {
				pasangan = [];
			}
			else {
				pasangan = (await sm.dao.pasangan.lihatPasangan(id, anggota.rel_id));
			}

			resp.status(200).send(JSON.stringify(pasangan));
		}
		catch (e) {
			util.respError(resp, e);
		}
	}


	//POST
	//====
	private async gambarTulisDisk(p: string, data: any): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(p, data, (err) => {
				if (err) {
					console.error(err);
					reject(err);
				}
				else {
					resolve();
				}
			});
		})
	}


	async upload(req: express.Request, resp: express.Response): Promise<void> {
		try {
			// console.debug('gambar upload');

			let buf: Buffer;
			let id: number = parseInt(req.params.id);

			let foto: IFoto = {
				gbr_baru: req.body.gbr_baru,
				thumb_baru: req.body.thumb_baru,
				nama_gbr: req.body.nama_gbr,
				nama_thumb: req.body.nama_thumb
			}

			//simpan gbr besar
			buf = Buffer.from(foto.gbr_baru, 'base64');
			await sm.cont.anggota.gambarTulisDisk(util.baseDir + sm.kons.folder_upload + foto.nama_gbr, buf);

			//simpan gambar kecil
			buf = Buffer.from(foto.thumb_baru, 'base64');
			await sm.cont.anggota.gambarTulisDisk(util.baseDir + sm.kons.folder_upload + foto.nama_thumb, buf);

			await sm.dao.anggota.update({
				thumb: sm.kons.folder_download + foto.nama_thumb,
				foto: sm.kons.folder_download + foto.nama_gbr
			}, id);

			resp.status(200).send(JSON.stringify({
				url_thumb: sm.kons.folder_download + foto.nama_thumb,
				url_gbr: sm.kons.folder_download + foto.nama_gbr
			}));

		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async daftarAnak(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);
			let anggota: ISlAnggota = (await sm.dao.anggota.lihat(id))[0];
			let hasil: ISlAnggota[] = [];

			if (anggota.rel_id == 0) {
				hasil = [];
			}
			else {
				hasil = await sm.dao.anak.daftarAnak(anggota.rel_id);
			}

			resp.status(200).send(JSON.stringify(hasil));
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async baru(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let data: ISlAnggota = {
				nama: v.escape(_req.body.nama),
				nama_lengkap: v.escape(_req.body.nama_lengkap),
				alamat: v.escape(_req.body.alamat),
				fb: v.escape(_req.body.fb),
				wa: v.escape(_req.body.wa),
				instagram: v.escape(_req.body.instagram),
				jkl: v.escape(_req.body.jkl),
				tgl_lahir: v.escape(_req.body.tgl_lahir),
				tgl_meninggal: v.escape(_req.body.tgl_meninggal),
				foto: v.escape(_req.body.foto),
				thumb: v.escape(_req.body.thumb),
				bani: session(_req).id
			};

			let hasil: IHasilQuery = await sm.dao.anggota.baru(data);
			resp.status(200).send(hasil.insertId + '');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async editInfo(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let data: ISlAnggota = {
				// id: parseInt(_req.params.id),
				nama: v.escape(_req.body.nama),
				nama_lengkap: v.escape(_req.body.nama_lengkap),
				alamat: v.escape(_req.body.alamat),
				fb: v.escape(_req.body.fb),
				wa: v.escape(_req.body.wa),
				instagram: v.escape(_req.body.instagram),
				jkl: v.escape(_req.body.jkl),
				tgl_lahir: v.escape(_req.body.tgl_lahir),
				tgl_meninggal: v.escape(_req.body.tgl_meninggal)
			};

			let id: number = parseInt(_req.params.id);

			//TODO:[ux] validate

			let hasil: IHasilQuery = await sm.dao.anggota.update(data, id);
			resp.status(200).send(JSON.stringify(hasil));
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async editRel(_req: express.Request, resp: express.Response): Promise<void> {
		try {
			let id: number = parseInt(_req.params.id);
			let id2: number = parseInt(_req.params.id2);

			// console.debug('update rel, id: ' + id + '/rel id: ' + id2);

			await sm.dao.anggota.updateRel(id, id2);

			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

	async editOrtu(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			let id: number = parseInt(_req.params.id);
			let idOrtu = parseInt(_req.params.id2);

			await sm.dao.ortu.updateOrtu(id, idOrtu);

			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}

	}

	async hapus(_req: express.Request, resp: express.Response): Promise<void> {
		try {

			await sm.dao.anggota.hapus(parseInt(_req.params.id));
			resp.status(200).send('');
		}
		catch (e) {
			util.respError(resp, e);
		}
	}

}