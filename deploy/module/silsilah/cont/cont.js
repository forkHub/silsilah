"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnggotaCont_1 = require("./AnggotaCont");
const AuthCont_1 = require("./AuthCont");
const BerandaCont_1 = require("./BerandaCont");
const RelasiCont_1 = require("./RelasiCont");
class Cont {
    constructor() {
        this.auth = new AuthCont_1.AuthController();
        this.anggota = new AnggotaCont_1.AnggotaCont();
        this.relasi = new RelasiCont_1.RelasiCont();
        this.beranda = new BerandaCont_1.BerandaCont();
    }
}
exports.Cont = Cont;
