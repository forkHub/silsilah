"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const Util_1 = require("../../Util");
const RouterKons_1 = require("../RouterKons");
const SessionData_1 = require("../SessionData");
const SilsilahModule_1 = require("../SilsilahModule");
class AuthController {
    async renderLogin(_req, resp) {
        try {
            resp.status(200).send(SilsilahModule_1.sm.render.auth.login.render());
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async login(_req, resp) {
        try {
            let userName = _req.body.user_name;
            let password = blueimp_md5_1.default(_req.body.password);
            let hasil = await SilsilahModule_1.sm.dao.auth.login(userName, password);
            if (!hasil || hasil.length == 0)
                throw Error('user name atau password salah');
            let admin = hasil[0];
            SessionData_1.session(_req).defId = admin.def_id;
            SessionData_1.session(_req).id = admin.id;
            SessionData_1.session(_req).statusLogin = true;
            resp.status(200).send('');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    async logout(_req, resp) {
        try {
            _req.session = null;
            resp.status(200).send('');
        }
        catch (e) {
            Util_1.util.respError(resp, e);
        }
    }
    //check auth middle ware
    checkAuthGet(req, resp, next) {
        if (!SilsilahModule_1.sm.session(req).statusLogin) {
            resp.status(401).redirect(RouterKons_1.RouterKOns.gp_auth_login);
        }
        else {
            next();
        }
    }
    checkAuthSession(req, resp, next) {
        if (!SilsilahModule_1.sm.session(req).statusLogin) {
            resp.status(401).send('belum login');
            // next();
        }
        else {
            next();
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
