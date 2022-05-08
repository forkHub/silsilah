import express from "express";
import { RouterKOns } from "../silsilah/RouterKons";
import { sm } from "../silsilah/SilsilahModule";

export class RouterAPI {

	readonly router = express.Router();


	mapRouter(): void {

		this.router.get(RouterKOns.g_anggota_daftar, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderDaftarAnggota);
		this.router.get(RouterKOns.g_anggota_daftar_kunci_hal, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderDaftarAnggotaCari);

		this.router.get(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderEditProfileAnggota);
		this.router.get(RouterKOns.g_anggota_id_edit_beranda, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderEditBerandaById);
		this.router.get(RouterKOns.gp_anggota_baru, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderAnggotaBaru);
		this.router.get(RouterKOns.g_anggota_id_calonAnak, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderDaftarCalonAnak);
		this.router.get(RouterKOns.g_anggota_id_calonAnak_cari, sm.auth.checkAuthSession, sm.admin.cont.anggota.renderDaftarCalonAnakCari);

		this.router.get(RouterKOns.halCariPasangan, sm.auth.checkAuthSession, sm.admin.cont.relasi.renderTambahPasangan);
		this.router.get(RouterKOns.halCariPasanganFilter, sm.auth.checkAuthSession, sm.admin.cont.relasi.renderTambahPasangan);

		this.router.get(RouterKOns.p_auth_login, sm.cont.auth.renderLogin);
		this.router.get(RouterKOns.gp_auth_logout, sm.cont.auth.logout);

		this.router.get("/", sm.auth.checkAuthSession, sm.cont.beranda.renderBeranda);
		this.router.get(RouterKOns.g_beranda_id, sm.auth.checkAuthSession, sm.cont.beranda.renderBerandaId);
		this.router.get(RouterKOns.g_beranda_lihat_id, sm.auth.checkAuthSession, sm.cont.beranda.lihatProfileAnggota);

		this.router.post(RouterKOns.gp_anggota_baru, sm.auth.checkAuthSession, sm.admin.cont.anggota.baru);
		this.router.post(RouterKOns.g_anggota_id_info_edit, sm.auth.checkAuthSession, sm.admin.cont.anggota.editInfo);
		this.router.post(RouterKOns.p_anggota_hapus_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.hapus);
		this.router.post(RouterKOns.p_anggota_id_anak_baca, sm.auth.checkAuthSession, sm.admin.cont.anggota.daftarAnak);
		this.router.post(RouterKOns.p_anggota_id_pas_lihat, sm.auth.checkAuthSession, sm.admin.cont.anggota.lihatPasangan);
		this.router.post(RouterKOns.p_anggota_id_gbr_upload, sm.auth.checkAuthSession, sm.admin.cont.anggota.upload);
		this.router.post(RouterKOns.p_anggota_id_rel_edit_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.editRel);
		this.router.post(RouterKOns.p_anggota_id_ortu_edit_id, sm.auth.checkAuthSession, sm.admin.cont.anggota.editOrtu);

		this.router.post(RouterKOns.p_auth_login, sm.cont.auth.login);

	}
}