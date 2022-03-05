"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const HalLogin_1 = require("./HalLogin");
class Auth {
    login = new HalLogin_1.HalLogin();
}
exports.Auth = Auth;
