"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sql_1 = require("../../Sql");
class RelDao {
    async byId(id) {
        return await Sql_1.sql.query(`
            SELECT *
            FROM sl_relasi
            WHERE id = ?
        `, [id]);
    }
    async baru() {
        return await Sql_1.sql.query(`INSERT INTO sl_relasi () VALUES ()`, []);
    }
}
exports.RelDao = RelDao;
