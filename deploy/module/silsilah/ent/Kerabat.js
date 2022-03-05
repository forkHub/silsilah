"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kerabat = void 0;
const SilsilahModule_1 = require("../SilsilahModule");
class Kerabat {
    async muat(anggota) {
        //ortu
        anggota.ortu = [];
        await this.ortu(anggota, anggota.ortu);
        //mbah
        anggota.mbah = [];
        await this.mbah(anggota.ortu, anggota.mbah);
        //saudara
        anggota.saudara = [];
        await this.muatSaudara(anggota, anggota.saudara);
        //lek
        anggota.lek = [];
        await this.lek(anggota.ortu, anggota.lek);
        //sepupu
        anggota.sepupu = [];
        await this.sepupu(anggota.lek, anggota.sepupu);
        //ponakan
        anggota.ponakan = [];
        await this.ponakan(anggota.saudara, anggota.ponakan);
        //cucu
        anggota.cucu = [];
        await this.cucu(anggota.anak, anggota.cucu);
    }
    async cucu(anakAr, data) {
        try {
            for (let i = 0; i < anakAr.length; i++) {
                let anak = anakAr[i];
                await this.anak(anak, data);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async ponakan(saudaraAr, data) {
        try {
            for (let i = 0; i < saudaraAr.length; i++) {
                let saudara = saudaraAr[i];
                await this.anak(saudara, data);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async muatRel(id) {
        try {
            return (await SilsilahModule_1.sm.dao.rel.byId(id))[0];
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }
    async muatAnggota(id) {
        try {
            return (await SilsilahModule_1.sm.dao.anggota.lihat(id))[0];
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }
    async anak(anggota, daftar) {
        try {
            if (anggota.rel_id <= 0)
                return;
            let rel = await this.muatRel(anggota.rel_id);
            if (!rel)
                return;
            let anakAr = await SilsilahModule_1.sm.dao.anak.daftarAnak(rel.id);
            anakAr.forEach((item) => {
                daftar.push(item);
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    async muatSaudara(anggota, daftar) {
        try {
            if (anggota.ortu_id <= 0)
                return;
            let anak = await SilsilahModule_1.sm.dao.anak.daftarAnak(anggota.ortu_id);
            anak.forEach((item) => {
                if (item.nama_lengkap != anggota.nama_lengkap) {
                    daftar.push(item);
                }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    async sepupu(lekAr, daftar) {
        try {
            for (let i = 0; i < lekAr.length; i++) {
                let lek = lekAr[i];
                await this.anak(lek, daftar);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async lek(ortuAr, daftar) {
        try {
            for (let i = 0; i < ortuAr.length; i++) {
                let ortu = ortuAr[i];
                await this.muatSaudara(ortu, daftar);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async mbah(ortu, daftar) {
        try {
            for (let i = 0; i < ortu.length; i++) {
                let item = ortu[i];
                this.ortu(item, daftar);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async ortu(anggota, daftar) {
        try {
            if (anggota.ortu_id == 0)
                return;
            let relOrtu = await this.muatRel(anggota.ortu_id);
            if (!relOrtu)
                return;
            let ortu = await SilsilahModule_1.sm.dao.ortu.lihatOrtu(relOrtu.id);
            if (!ortu)
                return;
            if (ortu.length == 0)
                return;
            ortu.forEach((item) => {
                daftar.push(item);
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.Kerabat = Kerabat;
