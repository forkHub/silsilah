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
const Router_1 = require("./module/api/Router");
const SilsilahModule_1 = require("./module/silsilah/SilsilahModule");
const Connection_1 = require("./module/Connection");
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
    // app.use("/", toko.router.router)
    app.use("/", Router_1.api.router);
    app.use("/", SilsilahModule_1.sm.router.router);
    Router_1.api.mapRouter();
    SilsilahModule_1.sm.router.mapRouter();
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