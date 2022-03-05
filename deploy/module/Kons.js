"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Kons {
    constructor() {
        this.folder_public = '/public/';
        this.folder_upload = '/public/upload/';
        this.folder_download = '/upload/';
    }
}
exports.Kons = Kons;
Kons.CARI_NORMAL = 1;
Kons.CARI_PASANGAN = 2;
Kons.CARI_ANAK = 3;
Kons.CARI_ORTU = 4;
exports.kons = new Kons();
