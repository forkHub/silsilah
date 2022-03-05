"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
class SessionData {
    _defId;
    _statusLogin = false;
    _level = '';
    _lapak = '';
    _id = 0;
    get defId() {
        return this._defId;
    }
    set defId(value) {
        this._defId = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get lapak() {
        return this._lapak;
    }
    set lapak(value) {
        this._lapak = value;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get statusLogin() {
        return this._statusLogin;
    }
    set statusLogin(value) {
        this._statusLogin = value;
    }
}
function session(req) {
    if (!req.session) {
        req.session = new SessionData();
    }
    return req.session;
}
exports.session = session;
