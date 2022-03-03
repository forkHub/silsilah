import express from "express";
import { sm } from "../../silsilah/SilsilahModule";
import { RouterAPI2Kons } from "../RouterAPI2Kons";

export class AnakCont {
    mapRouter(router: express.Router): void {

        router.post(RouterAPI2Kons.api_anggota_daftar, sm.auth.checkAuthGet, (_req: express.Request, _resp: express.Response): void => {
            //TODO:
        });
    }
}