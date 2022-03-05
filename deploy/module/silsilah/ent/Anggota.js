"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anggota = void 0;
const SilsilahModule_1 = require("../SilsilahModule");
class Anggota {
    async populate(id) {
        let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
        let anggota = anggotaAr[0];
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
        return anggota;
    }
}
exports.Anggota = Anggota;
