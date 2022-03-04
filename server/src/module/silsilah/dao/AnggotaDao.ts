import { sql } from "../../Sql";
import { config } from "../Config";

//TODO: [ref] nama query lebih semantik

export class AnggotaDao {

	readonly select_profile: string = ` id, nama, nama_lengkap, alamat, jkl, tgl_lahir, tgl_meninggal, wa, fb, instagram, thumb, foto, rel_id, ortu_id`;
	readonly select_nama: string = ' id, nama, nama_lengkap ';

	readonly where_jkl: string = ' WHERE jkl = ? ';
	readonly where_cari: string = ' WHERE (nama LIKE ? OR nama_lengkap LIKE ?) ';
	readonly where_semua: string = ' WHERE 1 ';
	readonly order_nama: string = ' ORDER BY nama ';

	//TODO: [ref] dibuat lebih sepesifik
	async baca(select: string, where: string, offset: number, order: string, data: any[]): Promise<ISlAnggota[]> {

		offset = parseInt(offset + ''); //validate number

		let query: string = `
			SELECT ${select}
			FROM sl_anggota
			${where}
			${order}
			LIMIT ${config.jmlPerHal}
			OFFSET ${offset}
		`;

		let hasil: ISlAnggota[] = await sql.query(query,
			data) as ISlAnggota[];

		return hasil;
	}

	//TODO: [ref] bani ambil dari session
	async jmlCariAnggota(kunci: string, bani: number, mode: number): Promise<IJUmlah> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

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

		let hasil: IJUmlah[] = await sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data) as IJUmlah[];

		return hasil[0];
	}

	//TODO: [ref] ambigue
	async jmlWhere(where: string, data: any[]): Promise<IJUmlah> {
		let hasil: IJUmlah[] = await sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data) as IJUmlah[];

		return hasil[0];
	}

	//TODO: [ref] bani ambil dari session, mode tidak dipakai
	async cariAnggota(kunci: string, offsetAbs: number, bani: number, mode: number): Promise<ISlAnggota[]> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

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

		return await sql.query(` 
			SELECT ${this.select_nama}
			FROM sl_anggota
			${where}
			${this.order_nama}
			LIMIT ${config.jmlPerHal}
			OFFSET ${offsetAbs}
		`, data);
	}

	async lihat(id: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id = ?
		`, [id]) as ISlAnggota[];
	}

	//baru
	//====
	async baru(data: ISlAnggota): Promise<IHasilQuery> {
		return await sql.query(`
			INSERT INTO sl_anggota 
					(nama, nama_lengkap, alamat, jkl, tgl_lahir, tgl_meninggal, foto, thumb, fb, wa, instagram, bani)
			VALUES 	(?,    ?,            ?,      ?,   ?,         ?,             ?,     ?,    ?,  ?,  ?,         ?) 
		`, [
			data.nama, data.nama_lengkap, data.alamat,
			data.jkl, data.tgl_lahir, data.tgl_meninggal, data.foto, data.thumb, data.fb,
			data.wa, data.instagram, data.bani
		]) as unknown as IHasilQuery
	}

	//hapus 
	//TODO: [next] hapus pakai soft-delete
	async hapus(id: number): Promise<IHasilQuery> {
		return await sql.query(`
			DELETE FROM sl_anggota
			WHERE id = ?
		`, [id]) as unknown as IHasilQuery;
	}

	//TODO: [ref] refaktor edit pakai ini
	async update(data: ISlAnggota, id: number): Promise<IHasilQuery> {
		return await sql.query(`
			UPDATE sl_anggota
			SET ?
			WHERE id = ?
		`, [data, id]) as unknown as IHasilQuery

	}

	async updateRel(id: number, relId: number): Promise<IHasilQuery> {
		return await sql.query(`
			UPDATE sl_anggota
			SET rel_id = ?
			WHERE id = ?
		`, [relId, id]) as unknown as IHasilQuery

	}

}