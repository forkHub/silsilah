"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnakDao = void 0;
const Sql_1 = require("../../Sql");
const Config_1 = require("../Config");
class AnakDao {
    async daftarCalonAnakBaru(kunci, bani, offset) {
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
			SELECT *
			FROM sl_anggota
			WHERE ${where}
			LIMIT ${Config_1.config.jmlPerHal}
			OFFSET ${offset}
		`;
        let hasil = await Sql_1.sql.query(query, data);
        return hasil;
        return []; //todo;
    }
    async daftarAnak(rel_id) {
        let hasil = await Sql_1.sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE ortu_id = ?
			ORDER BY tgl_lahir`, [rel_id]);
        return hasil;
    }
}
exports.AnakDao = AnakDao;
