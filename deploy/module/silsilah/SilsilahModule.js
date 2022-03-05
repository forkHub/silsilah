"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Kons_1 = require("../Kons");
const AuthCont_1 = require("./cont/AuthCont");
const cont_1 = require("./cont/cont");
const Dao_1 = require("./dao/Dao");
const Ent_1 = require("./ent/Ent");
const Render_1 = require("./render/Render");
const Router_1 = require("./Router");
const SessionData_1 = require("./SessionData");
class SM {
    constructor() {
        this.cont = new cont_1.Cont();
        this.router = new Router_1.Router();
        this.render = new Render_1.Render();
        this.dao = new Dao_1.Dao();
        this.kons = new Kons_1.Kons();
        this.auth = new AuthCont_1.AuthController();
        this.ent = new Ent_1.Entity();
        this.session = SessionData_1.session;
    }
}
exports.sm = new SM();
