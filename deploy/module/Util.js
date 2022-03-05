"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.Util = void 0;
const fs_1 = __importDefault(require("fs"));
const RouterKons_1 = require("./silsilah/RouterKons");
class Util {
    caches = [];
    _randId = '';
    _baseDir = '';
    static revisi = '02';
    getUrl(url, params) {
        let urlHasil = url;
        params.forEach((item) => {
            urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
        });
        return urlHasil;
    }
    //TODO: [rev] param
    hal2(offsetLog, jumlahAbs, kunci, path, jmlPerHal, anggota) {
        return `
			<nav aria-label="Page navigation example" style="text-align:center">
				${this.hal3(offsetLog, jumlahAbs, kunci, path, jmlPerHal, anggota)}
			</nav>
		`;
    }
    hal3(offsetLog, jumlahAbs, kunci, path, jmlPerHal, anggota) {
        let hasil = '';
        if (jumlahAbs <= jmlPerHal) {
            return '';
        }
        let jumlahLog = Math.ceil(jumlahAbs / jmlPerHal);
        let halSeb;
        let halSet;
        if (jumlahAbs <= 0) {
            return hasil;
        }
        halSeb = offsetLog - 1;
        if (halSeb < 0)
            halSeb = 0;
        halSet = offsetLog + 1;
        if (halSet > jumlahLog - 1)
            halSet = jumlahLog - 1;
        hasil = `
			<ul class="pagination">
				<li class="page-item">
					<a class="page-link" href="${this.getUrlCari(kunci, halSeb, path, anggota)}" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">${offsetLog + 1}/${jumlahLog}</a></li>
				<li class="page-item">
					<a class="page-link" href="${this.getUrlCari(kunci, halSet, path, anggota)}" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>		
		`;
        return hasil;
    }
    getUrlCari(kunci, hal, path, anggota) {
        let hasil;
        //beranda
        if (path == RouterKons_1.RouterKOns.g_anggota_daftar_kunci_hal) {
            hasil = this.getUrl(path, [kunci, hal]);
        }
        else if (path == RouterKons_1.RouterKOns.g_anggota_id_calon_pas_cari_kunci_hal) {
            hasil = this.getUrl(path, [anggota.id, kunci, hal]);
        }
        else if (path == RouterKons_1.RouterKOns.g_anggota_id_anak_tambah_kunci_hal) {
            hasil = this.getUrl(path, [anggota.id, kunci, hal]);
        }
        else {
            throw Error('path belum didefinisikan');
        }
        return hasil;
    }
    stringNull(t) {
        if (!t)
            return '---';
        if ('' == t)
            return '---';
        return t;
    }
    stringHrefNull(t) {
        if (!t)
            return '#';
        if ('' == t)
            return '#';
        return t;
    }
    renderValue(t) {
        if (!t)
            return '---';
        if ("" == t)
            return '---';
        return t;
    }
    dateTimeStamp(t) {
        if (!t)
            return '---';
        if ('' == t)
            return '---';
        t = t + '';
        let date = new Date(t);
        if (!date)
            return '---';
        if ('Invalid Date' == (date + ''))
            return '---';
        let dateStr = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        return dateStr;
    }
    buatDateSekarang() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    buatDateLama() {
        let date = new Date(1900, 1, 1);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    arr2String(ar) {
        let hasil = ' ';
        ar.forEach((item, idx) => {
            if (0 === idx) {
                hasil += item;
            }
            else {
                hasil += " ," + item;
            }
        });
        hasil += ' ';
        return hasil;
    }
    buatRandom() {
        this._randId = '';
        for (let i = 0; i < 10; i++) {
            this._randId += (Math.floor(Math.random() * 10) + '');
        }
    }
    renderSpasiEnter(str) {
        str = str.replace(/(?:\r\n|\r\|\n)/g, "<br/>");
        str = str.replace(/  /g, "&nbsp;&nbsp;");
        return str;
    }
    ambilDariCache(url) {
        let hasil = '';
        this.caches.forEach((item) => {
            if (item.url === url) {
                hasil = item.string;
            }
        });
        return hasil;
    }
    hapusCache() {
        this.caches = [];
    }
    async getFileNoCache(file) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(file, (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content.toString());
                }
            });
        });
    }
    respError(resp, e) {
        console.debug("==================================================");
        console.error(e);
        console.debug("==================================================");
        resp.status(500).send(e.message);
    }
    async getFile(file) {
        return new Promise((resolve, reject) => {
            let cache;
            cache = this.ambilDariCache(file);
            if (cache != '') {
                cache = cache.replace('{{revisi}}', Util.revisi);
                resolve(cache);
            }
            fs_1.default.readFile(file, (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.caches.push({
                        url: file,
                        string: content.toString()
                    });
                    resolve(content.toString().replace('{{revisi}}', Util.revisi));
                }
            });
        });
    }
    async tulisKeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path, data, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    buatWa(wa, namaBarang) {
        return 'https://wa.me/' + wa + "?text==========%0D%0A" + namaBarang + "%0D%0A=========%0D%0AAssalamu'alaikum:";
    }
    get randId() {
        return this._randId;
    }
    get baseDir() {
        return this._baseDir;
    }
    set baseDir(value) {
        this._baseDir = value;
    }
}
exports.Util = Util;
exports.util = new Util();
