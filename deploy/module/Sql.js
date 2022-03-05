"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
class Sql {
    async query(query, data) {
        // query = query.replace(/\t/g, '');
        // console.debug(query);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
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
exports.sql = new Sql();
