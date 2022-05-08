import express from "express";
import { RouterKOns } from "./RouterKons";
import { sm } from "./SilsilahModule";

export class Router {

	readonly router = express.Router();


	mapRouter(): void {

		//#admin
		//anggota
		this.router.get(RouterKOns.daftarAnggota, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarAnggota);
		this.router.get(RouterKOns.daftarAnggotaFilter, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarAnggotaCari);
		this.router.get(RouterKOns.editProfile, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderEditProfile);
		this.router.get(RouterKOns.halEditAnggota, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderHalBerandaEdit);
		this.router.get(RouterKOns.pendaftaranAnggota, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderPendaftaranAnggotaBaru);

		this.router.post(RouterKOns.pendaftaranAnggota, sm.auth.checkAuthSession, sm.admin.cont.anggota.pendaftaranAnggota);
		this.router.post(RouterKOns.editProfile, sm.auth.checkAuthSession, sm.admin.cont.anggota.editProfile);
		this.router.post(RouterKOns.hapusAnggota, sm.auth.checkAuthSession, sm.admin.cont.anggota.hapus);

		//anak
		this.router.get(RouterKOns.daftarCalonAnak, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarCalonAnak);
		this.router.get(RouterKOns.daftarCalonAnakFilter, sm.auth.checkAuthGet, sm.admin.cont.anggota.renderDaftarCalonAnakCari);
		this.router.post(RouterKOns.daftarAnak, sm.auth.checkAuthSession, sm.admin.cont.anggota.daftarAnak);

		//pasangan
		this.router.get(RouterKOns.halCariPasangan, sm.auth.checkAuthGet, sm.cont.relasi.renderCariPasangan);
		this.router.get(RouterKOns.halCariPasanganFilter, sm.auth.checkAuthGet, sm.cont.relasi.renderCariPasangan);

		this.router.post(RouterKOns.lihatPasangan, sm.auth.checkAuthSession, sm.admin.cont.anggota.lihatPasangan);	//TODO: dihapus

		this.router.post(RouterKOns.uploadFoto, sm.auth.checkAuthSession, sm.admin.cont.anggota.upload);
		this.router.post(RouterKOns.editRelasi, sm.auth.checkAuthSession, sm.admin.cont.anggota.editRel);
		this.router.post(RouterKOns.editOrtu, sm.auth.checkAuthSession, sm.admin.cont.anggota.editOrtu);

		//auth
		this.router.get(RouterKOns.login, sm.cont.auth.renderLogin);
		this.router.get(RouterKOns.logout, sm.cont.auth.logout);
		this.router.post(RouterKOns.login, sm.cont.auth.login);
		this.router.get("/", sm.auth.checkAuthGet, sm.cont.beranda.renderBeranda);

		//#web
		this.router.get(RouterKOns.berandaId, sm.auth.checkAuthGet, sm.cont.beranda.renderBerandaId);
		this.router.get(RouterKOns.lihatProfile, sm.auth.checkAuthGet, sm.cont.beranda.lihatProfileAnggota);
	}
}