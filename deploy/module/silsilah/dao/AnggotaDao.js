"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnggotaDao = void 0;
const Sql_1 = require("../../Sql");
const Config_1 = require("../Config");
//TODO: [ref] nama query lebih semantik
class AnggotaDao {
    select_profile = ` id, nama, nama_lengkap, alamat, jkl, tgl_lahir, tgl_meninggal, wa, fb, instagram, thumb, foto, rel_id, ortu_id`;
    select_nama = ' id, nama, nama_lengkap ';
    where_jkl = ' WHERE jkl = ? ';
    where_cari = ' WHERE (nama LIKE ? OR nama_lengkap LIKE ?) ';
    where_semua = ' WHERE 1 ';
    order_nama = ' ORDER BY nama ';
    //TODO: [ref] dibuat lebih sepesifik
    async baca(select, where, offset, order, data) {
        offset = parseInt(offset + ''); //validate number
        let query = `
			SELECT ${select}
			FROM sl_anggota
			${where}
			${order}
			LIMIT ${Config_1.config.jmlPerHal}
			OFFSET ${offset}
		`;
        let hasil = await Sql_1.sql.query(query, data);
        return hasil;
    }
    //TODO: [ref] bani ambil dari session
    async jmlCariAnggota(kunci, bani, mode) {
        let kunciSql = `%${kunci}%`;
        let where;
        let data = [];
        mode; //TODO:
        if ("---" == kunci || "" == kunci || "-" === kunci) {
            where = this.where_semua;
        }
        else {
            where = this.where_cari;
            data = [kunciSql, kunciSql];
        }
        //filter bani
        where += ' AND bani = ? ';
        data.push(bani);
        let hasil = await Sql_1.sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data);
        return hasil[0];
    }
    //TODO: [ref] ambigue
    async jmlWhere(where, data) {
        let hasil = await Sql_1.sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data);
        return hasil[0];
    }
    //TODO: [ref] bani ambil dari session, mode tidak dipakai
    async cariAnggota(kunci, offsetAbs, bani, mode) {
        let kunciSql = `%${kunci}%`;
        let where;
        let data = [];
        offsetAbs = parseInt(offsetAbs + '');
        mode; //TODO:
        if (("-" == kunci) || ("---" == kunci) || ("" == kunci)) {
            where = this.where_semua;
            data = [bani];
        }
        else {
            where = this.where_cari;
            data = [kunciSql, kunciSql, bani];
        }
        //filter bani
        where += " AND bani = ? ";
        return await Sql_1.sql.query(` 
			SELECT ${this.select_nama}
			FROM sl_anggota
			${where}
			${this.order_nama}
			LIMIT ${Config_1.config.jmlPerHal}
			OFFSET ${offsetAbs}
		`, data);
    }
    async lihat(id) {
        return await Sql_1.sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id = ?
		`, [id]);
    }
    //baru
    //====
    async baru(data) {
        return await Sql_1.sql.query(`
			INSERT INTO sl_anggota 
					(nama, nama_lengkap, alamat, jkl, tgl_lahir, tgl_meninggal, foto, thumb, fb, wa, instagram, bani)
			VALUES 	(?,    ?,            ?,      ?,   ?,         ?,             ?,     ?,    ?,  ?,  ?,         ?) 
		`, [
            data.nama, data.nama_lengkap, data.alamat,
            data.jkl, data.tgl_lahir, data.tgl_meninggal, data.foto, data.thumb, data.fb,
            data.wa, data.instagram, data.bani
        ]);
    }
    //hapus 
    //TODO: [next] hapus pakai soft-delete
    async hapus(id) {
        return await Sql_1.sql.query(`
			DELETE FROM sl_anggota
			WHERE id = ?
		`, [id]);
    }
    //TODO: [ref] refaktor edit pakai ini
    async update(data, id) {
        return await Sql_1.sql.query(`
			UPDATE sl_anggota
			SET ?
			WHERE id = ?
		`, [data, id]);
    }
    async updateRel(id, relId) {
        return await Sql_1.sql.query(`
			UPDATE sl_anggota
			SET rel_id = ?
			WHERE id = ?
		`, [relId, id]);
    }
}
exports.AnggotaDao = AnggotaDao;
