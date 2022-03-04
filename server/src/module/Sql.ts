import { Connection } from "./Connection";

class Sql {
	async query(query: string, data: any[]): Promise<unknown[]> {
		// query = query.replace(/\t/g, '');
		// console.debug(query);
		return new Promise((resolve, reject) => {
			Connection.pool.query(
				query, data,
				(_err: any, _rows: any) => {
					if (_err) {
						reject(_err);
					}
					else {
						resolve(_rows);
						// console.debug(_rows);
					}
				});
		});
	}

}

export var sql: Sql = new Sql();