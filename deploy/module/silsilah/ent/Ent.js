"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anggota_1 = require("./Anggota");
const Kerabat_1 = require("./Kerabat");
class Entity {
    constructor() {
        this.anggota = new Anggota_1.Anggota();
        this.kerabat = new Kerabat_1.Kerabat();
    }
}
exports.Entity = Entity;
