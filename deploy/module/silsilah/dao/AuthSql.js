"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSql = void 0;
const Sql_1 = require("../../Sql");
class AuthSql {
    async login(userName, password) {
        let hasil = await Sql_1.sql.query(`
			SELECT *
			FROM sl_admin
			WHERE user_name = ? AND password = ?
		`, [userName, password]);
        console.log("login:");
        console.log("user: " + userName);
        console.log("pass: " + password);
        return hasil;
    }
}
exports.AuthSql = AuthSql;
