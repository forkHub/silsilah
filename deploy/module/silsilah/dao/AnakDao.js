"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnakDao = void 0;
const Sql_1 = require("../../Sql");
const Config_1 = require("../Config");
const SilsilahModule_1 = require("../SilsilahModule");
class AnakDao {
    async daftarAnakBaru(kunci, bani, offset) {
        offset = parseInt(offset + ''); //validate number
        let where = '';
        let data;
        if ("-" == kunci) {
            where = ` (nama = ? OR nama_lengkap = ?) AND bani = ?`;
            data = [kunci, kunci, bani];
        }
        else {
            where = ` bani = ? `;
            data = [bani];
        }
        let query = `
			SELECT ${SilsilahModule_1.sm.dao.anggota.select_profile}
			FROM sl_anggota
			WHERE ${where}
			LIMIT ${Config_1.config.jmlPerHal}
			OFFSET ${offset}
		`;
        let hasil = await Sql_1.sql.query(query, data);
        return hasil;
        return []; //todo;
    }
}
exports.AnakDao = AnakDao;
