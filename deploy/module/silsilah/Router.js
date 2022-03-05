"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const RouterKons_1 = require("./RouterKons");
const SilsilahModule_1 = require("./SilsilahModule");
class Router {
    router = express_1.default.Router();
    mapRouter() {
        this.router.get(RouterKons_1.RouterKOns.g_anggota_daftar, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderDaftarAnggota);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_daftar_kunci_hal, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderDaftarAnggotaCari);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_info_edit, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderEditProfileAnggota);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_edit_beranda, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderEditBerandaById);
        this.router.get(RouterKons_1.RouterKOns.gp_anggota_baru, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderAnggotaBaru);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_anak_tambah, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderAnakBaru);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_anak_tambah_kunci_hal, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.anggota.renderAnakBaruCari);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_calon_pas_cari, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.relasi.renderTambahPasangan);
        this.router.get(RouterKons_1.RouterKOns.g_anggota_id_calon_pas_cari_kunci_hal, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.relasi.renderTambahPasangan);
        this.router.get(RouterKons_1.RouterKOns.gp_auth_login, SilsilahModule_1.sm.cont.auth.renderLogin);
        this.router.get(RouterKons_1.RouterKOns.gp_auth_logout, SilsilahModule_1.sm.cont.auth.logout);
        this.router.get("/", SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.beranda.renderBeranda);
        this.router.get(RouterKons_1.RouterKOns.g_beranda_id, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.beranda.renderBerandaId);
        this.router.get(RouterKons_1.RouterKOns.g_beranda_lihat_id, SilsilahModule_1.sm.auth.checkAuthGet, SilsilahModule_1.sm.cont.beranda.lihatProfileAnggota);
        this.router.post(RouterKons_1.RouterKOns.gp_anggota_baru, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.baru);
        this.router.post(RouterKons_1.RouterKOns.g_anggota_id_info_edit, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.editInfo);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_hapus_id, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.hapus);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_id_anak_baca, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.daftarAnak);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_id_pas_lihat, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.lihatPasangan);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_id_gbr_upload, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.upload);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_id_rel_edit_id, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.editRel);
        this.router.post(RouterKons_1.RouterKOns.p_anggota_id_ortu_edit_id, SilsilahModule_1.sm.auth.checkAuthSession, SilsilahModule_1.sm.cont.anggota.editOrtu);
        this.router.post(RouterKons_1.RouterKOns.gp_auth_login, SilsilahModule_1.sm.cont.auth.login);
    }
}
exports.Router = Router;
