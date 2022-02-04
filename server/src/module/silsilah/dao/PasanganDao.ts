import { sql } from "../../Sql";
import { config } from "../Config";

export class PasanganDao {

	async lihatPasangan(id: number, relId: number): Promise<ISlAnggota[]> {
		return await sql.query(`
			SELECT *
			FROM sl_anggota
			WHERE id != ?  AND rel_id = ? 
		`, [id, relId]) as ISlAnggota[];
	}

	//TODO: [ref] bani ambil dari session
	async jmlCariPasangan(kunci: string, offsetAbs: number, bani: number, jkl: number): Promise<IJUmlah> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

		offsetAbs = parseInt(offsetAbs + '');

		if (("-" == kunci) || ("---" == kunci) || ("" == kunci)) {
			where = "WHERE  1  AND bani = ? AND jkl = ? ";
			data = [bani, jkl];
		}
		else {
			where = ` 
				WHERE (nama LIKE ? OR nama_lengkap LIKE ?)  
				AND bani = ? AND jkl = ?
			`;
			data = [kunciSql, kunciSql, bani, jkl];
		}

		let hasil: IJUmlah[] = await sql.query(`
			SELECT COUNT(id) as jumlah
			FROM sl_anggota
			${where}
		`, data) as IJUmlah[];

		return hasil[0];
	}

	async daftarCalonPasangan(kunci: string, offsetAbs: number, bani: number, jkl: string): Promise<ISlAnggota[]> {
		let kunciSql: string = `%${kunci}%`;
		let where: string;
		let data: any[] = [];

		offsetAbs = parseInt(offsetAbs + '');

		if (("-" == kunci) || ("---" == kunci) || ("" == kunci)) {
			where = "WHERE  1  AND bani = ? AND jkl = ? ";
			data = [bani, jkl];
		}
		else {
			where = ` 
				WHERE (nama LIKE ? OR nama_lengkap LIKE ?)  
				AND bani = ? AND jkl = ?
			`;
			data = [kunciSql, kunciSql, bani, jkl];
		}

		return await sql.query(` 
			SELECT *
			FROM sl_anggota
			${where}
			ORDER BY NAMA
			LIMIT ${config.jmlPerHal}
			OFFSET ${offsetAbs}
		`, data);
	}

}