"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Anggota_1 = require("./Anggota");
const Kerabat_1 = require("./Kerabat");
class Entity {
    anggota = new Anggota_1.Anggota();
    kerabat = new Kerabat_1.Kerabat();
}
exports.Entity = Entity;
