"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cont = void 0;
const AnggotaCont_1 = require("./AnggotaCont");
const AuthCont_1 = require("./AuthCont");
const BerandaCont_1 = require("./BerandaCont");
const RelasiCont_1 = require("./RelasiCont");
class Cont {
    auth = new AuthCont_1.AuthController();
    anggota = new AnggotaCont_1.AnggotaCont();
    relasi = new RelasiCont_1.RelasiCont();
    beranda = new BerandaCont_1.BerandaCont();
}
exports.Cont = Cont;
