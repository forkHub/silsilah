"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilihAnggota = void 0;
const Param_1 = require("../../../Param");
const Util_1 = require("../../../Util");
const Config_1 = require("../../Config");
const RouterKons_1 = require("../../RouterKons");
const SilsilahModule_1 = require("../../SilsilahModule");
class PilihAnggota {
    render(anggotaAr, anggotaSumber, urlPost, urlCari, judul, kunci, jmlAbs, offsetLog) {
        //console.log('render pilih anggota');
        //console.log('offset log: ' + offsetLog)
        return `
		<!DOCTYPE html>
		<html lang="id">

		<head>
			<title>${Config_1.config.judul}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1">
			
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link rel='stylesheet' href="/css/umum.css?r=${Util_1.util.randId}" />

		</head>

		<body>
			<div class="cont container pilih anggota">

				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
					<li class="breadcrumb-item"><a class='' href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_daftar, [])}">daftar</a></li>
					<li class="breadcrumb-item"><a class='' href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_edit_beranda, [anggotaSumber.id])}">edit</a></li>
					<li class="breadcrumb-item active" aria-current="page">pilih</li>
					</ol>
				</nav>

				<h5>${judul}</h5>
				
				${SilsilahModule_1.sm.render.renderCari(true, urlCari, anggotaSumber)}

				<hr/>	

				<div class='info-cari text-align-center'>
					${this.infoCari(kunci, urlCari, anggotaSumber)}
				</div> 

				<div class='post-cont'>
					${this.daftarAnggota(anggotaAr, anggotaSumber, urlPost)}
				</div>

				<nav aria-label="Page navigation example" style="text-align:center">
				</nav>

				${Util_1.util.hal2(offsetLog, jmlAbs, kunci, urlCari, Config_1.config.jmlPerHal, anggotaSumber)}

    		</div>
			
			<script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>

		</body>
		</html>`;
    }
    daftarAnggota(anggotaAr, anggotaSumber, url) {
        let hasil = ``;
        if (anggotaAr.length == 0) {
            return `<div>tidak ada data</div>`;
        }
        anggotaAr.forEach((anggota) => {
            let el = `
			<div class='item list-group' id=${anggota.id}>
				<a 
					class="list-group-item list-group-item-action" 
					href="#"
					${Param_1.Param.HA_KLIK}
					${Param_1.Param.HA_POST}=${this.getUrlPost(url, anggota, anggotaSumber)}
					${Param_1.Param.HA_URL}=${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_edit_beranda, [anggotaSumber.id + ''])}
				> 
					<div class=''>${anggota.nama_lengkap}</div>
				</a>
			</div>`;
            hasil += el;
        });
        return hasil;
    }
    getUrlPost(url, anggotaDipilih, anggotaSumber) {
        if (url == RouterKons_1.RouterKOns.p_anggota_id_rel_edit_id) {
            return Util_1.util.getUrl(url, [anggotaDipilih.id, anggotaSumber.rel_id]);
        }
        else if (url == RouterKons_1.RouterKOns.p_anggota_id_ortu_edit_id) {
            return Util_1.util.getUrl(url, [anggotaDipilih.id, anggotaSumber.rel_id]);
        }
        else {
            throw Error('url invalid ' + url);
        }
    }
    infoCari(kunci, path, anggota) {
        //console.log('info cari, kunci: ' + kunci + '/path: ' + path + '/anggota: ' + anggota);
        if ('-' == kunci) {
            return '';
        }
        else {
            return `
				<p> menampilkan pencarian berdasar kata kunci "${decodeURI(kunci)}"</p>
				<a href="${Util_1.util.getUrlCari('-', 0, path, anggota)}">tampilkan semua hasil</a>
				<hr/>
			`;
        }
    }
}
exports.PilihAnggota = PilihAnggota;
