"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BerandaCont = void 0;
const Util_1 = require("../../Util");
const SessionData_1 = require("../SessionData");
const SilsilahModule_1 = require("../SilsilahModule");
class BerandaCont {
    async renderBerandaId(_req, resp) {
        try {
            let id = parseInt((_req).params.id);
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
            let anggota = anggotaAr[0];
            let hal;
            hal = SilsilahModule_1.sm.render.silsilah.render(anggota);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async renderBeranda(_req, resp) {
        try {
            let id = (0, SessionData_1.session)(_req).defId;
            let anggotaAr = await SilsilahModule_1.sm.dao.anggota.lihat(id);
            let anggota = anggotaAr[0];
            let hal;
            console.debug('def id ' + id);
            console.log("data anggota:");
            console.log("=============");
            console.log(anggota);
            console.log("=============");
            hal = SilsilahModule_1.sm.render.silsilah.render(anggota);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async lihatProfileAnggota(_req, resp) {
        try {
            let id = parseInt(_req.params.id);
            let hal;
            let anggota = await SilsilahModule_1.sm.ent.anggota.populate(id);
            await SilsilahModule_1.sm.ent.kerabat.muat(anggota);
            hal = SilsilahModule_1.sm.render.web.profile.render(anggota);
            resp.status(200).send(hal);
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
}
exports.BerandaCont = BerandaCont;
