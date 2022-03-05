import express from "express";
import { RouterKOns } from "../../silsilah/RouterKons";
import { sm } from "../../silsilah/SilsilahModule";
import { util } from "../../Util";
import { cont } from "../cont/Cont";

export class AnggotaRouter {
    router(router: express.Router) {
        router.get(RouterKOns.g_beranda_lihat_id, sm.auth.checkAuthGet, (_req: express.Request, resp: express.Response) => {
            try {
                let id: number = parseInt(_req.params.id);
                cont.anggota.lihatProfileAnggota(id).then((anggota: ISlAnggota) => {
                    anggota; //TODO:
                }).catch((e) => {
                    util.respError(resp, e);
                });
            } catch (e) {
                util.respError(resp, e);
            }
        })
    }
}
