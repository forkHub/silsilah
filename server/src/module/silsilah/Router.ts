import express from "express";
import { RouterKOns } from "./RouterKons";
import { sm } from "./SilsilahModule";

export class Router {

	readonly router = express.Router();


	mapRouter(): void {

		this.router.get(RouterKOns.g_anggota_daftar, sm.auth.checkAuthGet, sm.cont.anggota.renderDaftarAnggota);
		this.router.get(RouterKOns.g_anggota_daftar_kunci_hal, sm.auth.checkAuthGet, sm.cont.anggota.renderDaftarAnggotaCari);
		this.router.get(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthGet, sm.cont.anggota.renderEditProfileAnggota);
		this.router.get(RouterKOns.g_anggota_id_edit_beranda, sm.auth.checkAuthGet, sm.cont.anggota.renderEditBerandaById);
		this.router.get(RouterKOns.gp_anggota_baru, sm.auth.checkAuthGet, sm.cont.anggota.renderAnggotaBaru);
		this.router.get(RouterKOns.g_anggota_id_anak_tambah, sm.auth.checkAuthGet, sm.cont.anggota.renderAnakBaru);
		this.router.get(RouterKOns.g_anggota_id_anak_tambah_kunci_hal, sm.auth.checkAuthGet, sm.cont.anggota.renderAnakBaruCari);

		this.router.get(RouterKOns.g_anggota_id_calon_pas_cari, sm.auth.checkAuthGet, sm.cont.relasi.renderTambahPasangan);
		this.router.get(RouterKOns.g_anggota_id_calon_pas_cari_kunci_hal, sm.auth.checkAuthGet, sm.cont.relasi.renderTambahPasangan);

		this.router.get(RouterKOns.gp_auth_login, sm.cont.auth.renderLogin);
		this.router.get(RouterKOns.gp_auth_logout, sm.cont.auth.logout);

		this.router.get("/", sm.auth.checkAuthGet, sm.cont.beranda.renderBeranda);
		this.router.get(RouterKOns.g_beranda_id, sm.auth.checkAuthGet, sm.cont.beranda.renderBerandaId);
		this.router.get(RouterKOns.g_beranda_lihat_id, sm.auth.checkAuthGet, sm.cont.beranda.lihatProfileAnggota);

		this.router.post(RouterKOns.gp_anggota_baru, sm.auth.checkAuthSession, sm.cont.anggota.baru);
		this.router.post(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthSession, sm.cont.anggota.editInfo);
		this.router.post(RouterKOns.p_anggota_hapus_id, sm.auth.checkAuthSession, sm.cont.anggota.hapus);
		this.router.post(RouterKOns.p_anggota_id_anak_baca, sm.auth.checkAuthSession, sm.cont.anggota.daftarAnak);
		this.router.post(RouterKOns.p_anggota_id_pas_lihat, sm.auth.checkAuthSession, sm.cont.anggota.lihatPasangan);
		this.router.post(RouterKOns.p_anggota_id_gbr_upload, sm.auth.checkAuthSession, sm.cont.anggota.upload);
		this.router.post(RouterKOns.p_anggota_id_rel_edit_id, sm.auth.checkAuthSession, sm.cont.anggota.editRel);
		this.router.post(RouterKOns.p_anggota_id_ortu_edit_id, sm.auth.checkAuthSession, sm.cont.anggota.editOrtu);

		this.router.post(RouterKOns.gp_auth_login, sm.cont.auth.login);

	}
}