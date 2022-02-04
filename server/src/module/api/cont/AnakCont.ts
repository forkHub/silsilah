import express from "express";
import { util } from "../../Util";

export class AnakCont {
    async baru(_req: express.Request, resp: express.Response): Promise<void> {
        try {
            // let anggotaAr: ISlAnggota[] = await sm.dao.anggota.cariAnggota('---', 0, session(_req).id);
            // let jml: number = (await sm.dao.anggota.jmlCariAnggota('---', session(_req).id)).jumlah;

            // let hal: string = sm.render.daftarAnggota.render(anggotaAr, 0, jml, '---', RouterKOns.g_anggota_daftar_kunci_hal);
            // resp.status(200).send(hal);
        }
        catch (e) {
            util.respError(resp, e);
        }
    }
}