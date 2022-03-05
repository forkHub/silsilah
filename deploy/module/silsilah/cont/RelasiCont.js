"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
// import { config } from "../Config";
const RouterKons_1 = require("../RouterKons");
const SessionData_1 = require("../SessionData");
const SilsilahModule_1 = require("../SilsilahModule");
class RelasiCont {
    //TODO: abs
    async renderTambahPasangan(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let kunci = '-';
            let jmlAbs = 0;
            let hal = 0;
            let where = SilsilahModule_1.sm.dao.anggota.where_jkl;
            // let select: string = sm.dao.anggota.select_profile;
            // let order: string = sm.dao.anggota.order_nama;
            let jkl = '';
            let data = [];
            let offset = 0;
            //parameter bila ada
            if (_req.params.kunci)
                kunci = _req.params.kunci;
            if (_req.params.hal)
                hal = parseInt(_req.params.hal);
            //buat relasi bila belum ada
            let anggota = (await SilsilahModule_1.sm.dao.anggota.lihat(id))[0];
            if (anggota.rel_id == 0) {
                anggota.rel_id = (await SilsilahModule_1.sm.dao.rel.baru()).insertId;
                await SilsilahModule_1.sm.dao.anggota.updateRel(anggota.id, anggota.rel_id);
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
            let anggotaAr = await SilsilahModule_1.sm.dao.pasangan.daftarCalonPasangan(kunci, offset, SessionData_1.session(_req).id, jkl);
            jmlAbs = (await SilsilahModule_1.sm.dao.anggota.jmlWhere(where, data)).jumlah;
            let str = SilsilahModule_1.sm.render.pilihAnggota.render(anggotaAr, anggota, RouterKons_1.RouterKOns.p_anggota_id_rel_edit_id, RouterKons_1.RouterKOns.g_anggota_id_calon_pas_cari_kunci_hal, 'pilih pasangan:', kunci, jmlAbs, hal);
            resp.status(200).send(str);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
}
exports.RelasiCont = RelasiCont;
