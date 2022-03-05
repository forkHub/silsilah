import { sql } from "../../Sql";

export class AuthSql {
	async login(userName: string, password: string): Promise<ISlAdmin[]> {

		let hasil: ISlAdmin[] = await sql.query(`
			SELECT *
			FROM sl_admin
			WHERE user_name = ? AND password = ?
		`, [userName, password]) as ISlAdmin[];

		console.log("login:");
		console.log("user: " + userName);
		console.log("pass: " + password);

		return hasil;
	}
}
