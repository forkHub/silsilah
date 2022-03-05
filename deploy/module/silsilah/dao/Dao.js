"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnakDao_1 = require("./AnakDao");
const AnggotaDao_1 = require("./AnggotaDao");
const AuthSql_1 = require("./AuthSql");
const OrtuDao_1 = require("./OrtuDao");
const PasanganDao_1 = require("./PasanganDao");
const RelDao_1 = require("./RelDao");
class Dao {
    constructor() {
        this.auth = new AuthSql_1.AuthSql();
        this.anggota = new AnggotaDao_1.AnggotaDao();
        this.rel = new RelDao_1.RelDao();
        this.anak = new AnakDao_1.AnakDao();
        this.ortu = new OrtuDao_1.OrtuDao();
        this.pasangan = new PasanganDao_1.PasanganDao();
    }
}
exports.Dao = Dao;
