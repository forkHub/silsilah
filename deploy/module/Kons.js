"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kons = exports.Kons = void 0;
class Kons {
    folder_public = '/public/';
    folder_upload = '/public/upload/';
    folder_download = '/upload/';
    static CARI_NORMAL = 1;
    static CARI_PASANGAN = 2;
    static CARI_ANAK = 3;
    static CARI_ORTU = 4;
}
exports.Kons = Kons;
exports.kons = new Kons();
