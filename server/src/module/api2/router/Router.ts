import express from "express";
import { AnggotaRouter } from "./Anggota";

export class Router {
    private router: express.Router = express.Router();
    private anggota: AnggotaRouter = new AnggotaRouter();

    constructor() {
        this.anggota.router(this.router);
    }

}



