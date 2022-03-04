"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sm = void 0;
const Kons_1 = require("../Kons");
const AuthCont_1 = require("./cont/AuthCont");
const cont_1 = require("./cont/cont");
const Dao_1 = require("./dao/Dao");
const Ent_1 = require("./ent/Ent");
const Render_1 = require("./render/Render");
const Router_1 = require("./Router");
const SessionData_1 = require("./SessionData");
class SM {
    cont = new cont_1.Cont();
    router = new Router_1.Router();
    render = new Render_1.Render();
    dao = new Dao_1.Dao();
    kons = new Kons_1.Kons();
    auth = new AuthCont_1.AuthController();
    ent = new Ent_1.Entity();
    session = SessionData_1.session;
}
exports.sm = new SM();
