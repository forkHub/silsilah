"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = void 0;
const AnakDao_1 = require("./AnakDao");
const AnggotaDao_1 = require("./AnggotaDao");
const AuthSql_1 = require("./AuthSql");
const OrtuDao_1 = require("./OrtuDao");
const PasanganDao_1 = require("./PasanganDao");
const RelDao_1 = require("./RelDao");
class Dao {
    auth = new AuthSql_1.AuthSql();
    anggota = new AnggotaDao_1.AnggotaDao();
    rel = new RelDao_1.RelDao();
    anak = new AnakDao_1.AnakDao();
    ortu = new OrtuDao_1.OrtuDao();
    pasangan = new PasanganDao_1.PasanganDao();
}
exports.Dao = Dao;
