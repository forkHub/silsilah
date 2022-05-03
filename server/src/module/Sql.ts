import { Connection } from "./Connection";

class Sql {
	async query(query: string, data: any[]): Promise<unknown[]> {


		return new Promise((resolve, reject) => {
			Connection.pool.query(
				query, data,
				(_err: any, _rows: any) => {
					if (_err) {
						query = query.replace(/\t/g, '');
						console.log("=============");
						console.log('query:')
						console.debug(query);
						console.log("data:");
						console.log(data)
						console.log("=============");
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