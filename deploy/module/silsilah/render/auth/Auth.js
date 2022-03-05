"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HalLogin_1 = require("./HalLogin");
class Auth {
    constructor() {
        this.login = new HalLogin_1.HalLogin();
    }
}
exports.Auth = Auth;
