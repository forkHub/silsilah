"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const Sql_1 = require("../Sql");
const Util_1 = require("../Util");
const Config_1 = require("./Config");
class Api {
    router = express_1.default.Router();
    mapRouter() {
        console.debug('api router');
        this.router.post("/api", (req, resp) => {
            try {
                if (!Config_1.config.dev)
                    throw Error('dev');
                Sql_1.sql.query(req.body.api, []).then((h) => {
                    h;
                    resp.status(200).send(h);
                }).catch((e) => {
                    Util_1.util.respError(resp, e);
                });
            }
            catch (e) {
                Util_1.util.respError(resp, e);
            }
        });
    }
}
exports.api = new Api();
