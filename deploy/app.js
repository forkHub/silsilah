"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const Kons_1 = require("./module/Kons");
const Util_1 = require("./module/Util");
// import { api } from "./module/api/Router";
const SilsilahModule_1 = require("./module/silsilah/SilsilahModule");
const Connection_1 = require("./module/Connection");
const Api2_1 = require("./module/api2/Api2");
const app = (0, express_1.default)();
const port = 3000;
try {
    Util_1.util.buatRandom();
    Util_1.util.baseDir = __dirname;
    app.use(express_1.default.static(__dirname + Kons_1.kons.folder_public));
    app.use(express_1.default.json({ limit: '5mb' }));
    app.use((0, cookie_session_1.default)({
        name: 'toko_session',
        keys: ['Auni_202002_cookie_session'],
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2
    }));
    app.options('*', function (_req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        res.sendStatus(200);
    });
    app.use(function (_req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.setHeader("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,POST,PUT");
        // response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        res.status(200);
        next();
    });
    // app.use("/", toko.router.router)
    // app.use("/", api.router);
    app.use("/", SilsilahModule_1.sm.router.router);
    app.use("/", Api2_1.api2.router.router);
    // api.mapRouter();
    SilsilahModule_1.sm.router.mapRouter();
    Api2_1.api2.router.mapRouter();
    // toko.router.mapRouter();
    app.use((_req, _resp, _next) => {
        _resp.status(404).send(`<html><head><title>404</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>Halaman Tidak Ditemukan</body></html>`);
    });
    process.on('SIGTERM', () => {
        try {
            Connection_1.Connection.pool.end((err) => {
                if (err) {
                    console.error;
                }
                else {
                }
            });
        }
        catch (e) {
            console.error;
        }
    });
    Connection_1.Connection.connect();
}
catch (e) {
    console.log("========================================");
    console.error(e);
    console.log("========================================");
}
exports.server = app.listen(port, () => {
    console.log('app started');
});
