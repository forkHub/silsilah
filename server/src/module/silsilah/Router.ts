import express from "express";
import { RouterKOns } from "./RouterKons";
import { sm } from "./SilsilahModule";

export class Router {

	readonly router = express.Router();


	mapRouter(): void {

		//#admin
		//anggota
		this.router.get(RouterKOns.g_anggota_daftar, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarAnggota);
		this.router.get(RouterKOns.g_anggota_daftar_kunci_hal, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarAnggotaCari);
		this.router.get(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderEditProfileAnggota);
		this.router.get(RouterKOns.g_anggota_id_edit_beranda, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderEditBerandaById);
		this.router.get(RouterKOns.gp_anggota_baru, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderAnggotaBaru);
		this.router.post(RouterKOns.gp_anggota_baru, sm.auth.checkAuthSession, sm.admin.cont.anggota.baru);
		this.router.post(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthSession, sm.admin.cont.anggota.editInfo);
		this.router.post(RouterKOns.p_anggota_hapus_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.hapus);

		//anak
		this.router.get(RouterKOns.g_anggota_id_calonAnak, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarCalonAnak);
		this.router.get(RouterKOns.g_anggota_id_calonAnak_cari, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarCalonAnakCari);
		this.router.post(RouterKOns.p_anggota_id_anak_baca, sm.auth.checkAuthSession, sm.admin.cont.anggota.daftarAnak);

		//pasangan
		this.router.get(RouterKOns.halCariPasangan, sm.auth.checkAuthGet, sm.cont.relasi.renderCariPasangan);
		this.router.get(RouterKOns.halCariPasanganFilter, sm.auth.checkAuthGet, sm.cont.relasi.renderCariPasangan);
		this.router.post(RouterKOns.p_anggota_id_pas_lihat, sm.auth.checkAuthSession, sm.admin.cont.anggota.lihatPasangan);

		this.router.post(RouterKOns.p_anggota_id_gbr_upload, sm.auth.checkAuthSession, sm.admin.cont.anggota.upload);
		this.router.post(RouterKOns.p_anggota_id_rel_edit_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.editRel);
		this.router.post(RouterKOns.p_anggota_id_ortu_edit_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.editOrtu);

		//auth
		this.router.get(RouterKOns.p_auth_login, sm.cont.auth.renderLogin);
		this.router.get(RouterKOns.gp_auth_logout, sm.cont.auth.logout);
		this.router.post(RouterKOns.p_auth_login, sm.cont.auth.login);
		this.router.get("/", sm.auth.checkAuthGet, sm.cont.beranda.renderBeranda);

		//#web
		this.router.get(RouterKOns.g_beranda_id, sm.auth.checkAuthGet, sm.cont.beranda.renderBerandaId);
		this.router.get(RouterKOns.g_beranda_lihat_id, sm.auth.checkAuthGet, sm.cont.beranda.lihatProfileAnggota);
	}
}