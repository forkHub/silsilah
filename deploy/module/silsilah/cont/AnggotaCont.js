"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnggotaCont = void 0;
const fs_1 = __importDefault(require("fs"));
const Util_1 = require("../../Util");
const Validator_1 = require("../../Validator");
const Config_1 = require("../Config");
const RouterKons_1 = require("../RouterKons");
const SilsilahModule_1 = require("../SilsilahModule");
const SessionData_1 = require("../SessionData");
const Kons_1 = require("../../Kons");
class AnggotaCont {
    async renderDaftarAnggota(_req, resp) {
        try {
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.cariAnggota('---', 0, (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL);
            let jml = (await SilsilahModule_1.sm.dao.anggota.jmlCariAnggota('---', (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL)).jumlah;
            let hal = SilsilahModule_1.sm.render.daftarAnggota.render(anggotaAr, 0, jml, '---', RouterKons_1.RouterKOns.g_anggota_daftar_kunci_hal);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async renderEditBerandaById(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
            let anggota = anggotaAr[0];
            let hal;
            //pasangan info
            if (anggota.rel_id > 0) {
                let pasAr = await SilsilahModule_1.sm.dao.pasangan.lihatPasangan(anggota.id, anggota.rel_id);
                let pas = pasAr[0];
                anggota.pas = pas;
                anggota.rel = (await SilsilahModule_1.sm.dao.rel.byId(anggota.rel_id))[0];
                anggota.anak = (await SilsilahModule_1.sm.dao.anak.daftarAnak(anggota.rel_id));
            }
            else {
                anggota.anak = [];
            }
            hal = SilsilahModule_1.sm.render.editBeranda.render(anggota);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async renderEditProfileAnggota(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
            let anggota = anggotaAr[0];
            let hal = SilsilahModule_1.sm.render.editProfileAnggota.render(anggota);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async renderAnakBaru(_req, resp) {
        let anggotaAr = await SilsilahModule_1.sm.dao.anggota.cariAnggota("-", 0, (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL);
        let jml = (await SilsilahModule_1.sm.dao.anggota.jmlCariAnggota("---", (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL)).jumlah;
        let anggota = (await SilsilahModule_1.sm.dao.anggota.lihat(parseInt(_req.params.id)))[0];
        let hal = SilsilahModule_1.sm.render.pilihAnggota.render(anggotaAr, anggota, RouterKons_1.RouterKOns.p_anggota_id_ortu_edit_id, RouterKons_1.RouterKOns.g_anggota_id_anak_tambah_kunci_hal, 'pilih anak', "-", jml, 0);
        resp.status(200).send(hal);
    }
    async renderAnakBaruCari(_req, resp) {
        let id = parseInt(_req.params.id);
        let kunci = decodeURI(_req.params.kunci);
        let anggota = (await SilsilahModule_1.sm.dao.anggota.lihat(id))[0];
        let select = SilsilahModule_1.sm.dao.anggota.select_profile;
        let where = SilsilahModule_1.sm.dao.anggota.where_semua;
        let order = SilsilahModule_1.sm.dao.anggota.order_nama;
        let offsetLog = parseInt(_req.params.hal);
        let jml = (await SilsilahModule_1.sm.dao.anggota.jmlCariAnggota(kunci, (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL)).jumlah;
        let kunciSql = '%' + kunci + '%';
        if (!kunci || "-" == kunci) {
            where = SilsilahModule_1.sm.dao.anggota.where_semua;
        }
        else {
            where = SilsilahModule_1.sm.dao.anggota.where_cari;
        }
        //fiter bani
        where += " AND bani = ? ";
        let anggotaAr = await SilsilahModule_1.sm.dao.anggota.baca(select, where, offsetLog * Config_1.config.jmlPerHal, order, [kunciSql, kunciSql, (0, SessionData_1.session)(_req).id]);
        let hal = SilsilahModule_1.sm.render.pilihAnggota.render(anggotaAr, anggota, RouterKons_1.RouterKOns.p_anggota_id_ortu_edit_id, RouterKons_1.RouterKOns.g_anggota_id_anak_tambah_kunci_hal, 'pilih anak', kunci, jml, offsetLog);
        resp.status(200).send(hal);
    }
    async renderDaftarAnggotaCari(_req, resp) {
        try {
            let kunci = decodeURI(_req.params.kunci);
            let hal = parseInt(_req.params.hal);
            let jml = (await SilsilahModule_1.sm.dao.anggota.jmlCariAnggota(kunci, (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL)).jumlah;
            let offsetAbs = hal * Config_1.config.jmlPerHal;
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.cariAnggota(kunci, offsetAbs, (0, SessionData_1.session)(_req).id, Kons_1.Kons.CARI_NORMAL);
            let str = SilsilahModule_1.sm.render.daftarAnggota.render(anggotaAr, hal, jml, kunci, RouterKons_1.RouterKOns.g_anggota_daftar_kunci_hal);
            resp.status(200).send(str);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async renderAnggotaBaru(_req, resp) {
        try {
            let hal = SilsilahModule_1.sm.render.anggotaBaru.render();
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    //API
    async lihatPasangan(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
            let anggota = anggotaAr[0];
            let pasangan = [];
            if (anggota.rel_id == 0) {
                pasangan = [];
            }
            else {
                pasangan = (await SilsilahModule_1.sm.dao.pasangan.lihatPasangan(id, anggota.rel_id));
            }
            resp.status(200).send(JSON.stringify(pasangan));
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    //POST
    //====
    async gambarTulisDisk(p, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(p, data, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async upload(req, resp) {
        try {
            // console.debug('gambar upload');
            let buf;
            let id = parseInt(req.params.id);
            let foto = {
                gbr_baru: req.body.gbr_baru,
                thumb_baru: req.body.thumb_baru,
                nama_gbr: req.body.nama_gbr,
                nama_thumb: req.body.nama_thumb
            };
            //simpan gbr besar
            buf = Buffer.from(foto.gbr_baru, 'base64');
            await SilsilahModule_1.sm.cont.anggota.gambarTulisDisk(Util_1.util.baseDir + SilsilahModule_1.sm.kons.folder_upload + foto.nama_gbr, buf);
            //simpan gambar kecil
            buf = Buffer.from(foto.thumb_baru, 'base64');
            await SilsilahModule_1.sm.cont.anggota.gambarTulisDisk(Util_1.util.baseDir + SilsilahModule_1.sm.kons.folder_upload + foto.nama_thumb, buf);
            await SilsilahModule_1.sm.dao.anggota.update({
                thumb: SilsilahModule_1.sm.kons.folder_download + foto.nama_thumb,
                foto: SilsilahModule_1.sm.kons.folder_download + foto.nama_gbr
            }, id);
            resp.status(200).send(JSON.stringify({
                url_thumb: SilsilahModule_1.sm.kons.folder_download + foto.nama_thumb,
                url_gbr: SilsilahModule_1.sm.kons.folder_download + foto.nama_gbr
            }));
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async daftarAnak(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let anggota = (await SilsilahModule_1.sm.dao.anggota.lihat(id))[0];
            let hasil = [];
            if (anggota.rel_id == 0) {
                hasil = [];
            }
            else {
                hasil = await SilsilahModule_1.sm.dao.anak.daftarAnak(anggota.rel_id);
            }
            resp.status(200).send(JSON.stringify(hasil));
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async baru(_req, resp) {
        try {
            let data = {
                nama: Validator_1.v.escape(_req.body.nama),
                nama_lengkap: Validator_1.v.escape(_req.body.nama_lengkap),
                alamat: Validator_1.v.escape(_req.body.alamat),
                fb: Validator_1.v.escape(_req.body.fb),
                wa: Validator_1.v.escape(_req.body.wa),
                instagram: Validator_1.v.escape(_req.body.instagram),
                jkl: Validator_1.v.escape(_req.body.jkl),
                tgl_lahir: Validator_1.v.escape(_req.body.tgl_lahir),
                tgl_meninggal: Validator_1.v.escape(_req.body.tgl_meninggal),
                foto: Validator_1.v.escape(_req.body.foto),
                thumb: Validator_1.v.escape(_req.body.thumb),
                bani: (0, SessionData_1.session)(_req).id
            };
            let hasil = await SilsilahModule_1.sm.dao.anggota.baru(data);
            resp.status(200).send(hasil.insertId + '');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async editInfo(_req, resp) {
        try {
            let data = {
                // id: parseInt(_req.params.id),
                nama: Validator_1.v.escape(_req.body.nama),
                nama_lengkap: Validator_1.v.escape(_req.body.nama_lengkap),
                alamat: Validator_1.v.escape(_req.body.alamat),
                fb: Validator_1.v.escape(_req.body.fb),
                wa: Validator_1.v.escape(_req.body.wa),
                instagram: Validator_1.v.escape(_req.body.instagram),
                jkl: Validator_1.v.escape(_req.body.jkl),
                tgl_lahir: Validator_1.v.escape(_req.body.tgl_lahir),
                tgl_meninggal: Validator_1.v.escape(_req.body.tgl_meninggal)
            };
            let id = parseInt(_req.params.id);
            //TODO:[ux] validate
            let hasil = await SilsilahModule_1.sm.dao.anggota.update(data, id);
            resp.status(200).send(JSON.stringify(hasil));
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async editRel(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let id2 = parseInt(_req.params.id2);
            // console.debug('update rel, id: ' + id + '/rel id: ' + id2);
            await SilsilahModule_1.sm.dao.anggota.updateRel(id, id2);
            resp.status(200).send('');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async editOrtu(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let idOrtu = parseInt(_req.params.id2);
            await SilsilahModule_1.sm.dao.ortu.updateOrtu(id, idOrtu);
            resp.status(200).send('');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async hapus(_req, resp) {
        try {
            await SilsilahModule_1.sm.dao.anggota.hapus(parseInt(_req.params.id));
            resp.status(200).send('');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
}
exports.AnggotaCont = AnggotaCont;
