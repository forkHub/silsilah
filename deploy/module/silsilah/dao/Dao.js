"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = void 0;
const AnakDao_1 = require("./AnakDao");
const AnggotaDao_1 = require("./AnggotaDao");
const AuthSql_1 = require("./AuthSql");
const RelDao_1 = require("./RelDao");
class Dao {
    auth = new AuthSql_1.AuthSql();
    anggota = new AnggotaDao_1.AnggotaDao();
    rel = new RelDao_1.RelDao();
    anak = new AnakDao_1.AnakDao();
}
exports.Dao = Dao;
