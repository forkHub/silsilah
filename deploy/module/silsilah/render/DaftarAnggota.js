"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
const Config_1 = require("../Config");
const RouterKons_1 = require("../RouterKons");
const SilsilahModule_1 = require("../SilsilahModule");
class DaftarAnggotaRenderer {
    render(anggotaAr, offsetLog, jumlahAbs, kunci, path) {
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

			<div class="cont container daftar-anggota">

				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a class='' href="/">🏠</a></li>
						<li class="breadcrumb-item active" aria-current="page">daftar</li>
					</ol>
				</nav>

				<br/>

				<h4>daftar anggota keluarga:</h4>

				${SilsilahModule_1.sm.render.renderCari(true, RouterKons_1.RouterKOns.g_anggota_daftar_kunci_hal, anggotaAr[0])}

				<hr/>

				<div class='info-cari text-align-center'>
					${this.infoCari(kunci, path)}
				</div> 

				<div class='post-cont'>
					${this.daftarAnggota(anggotaAr)}
				</div>

				<nav aria-label="Page navigation example" style="text-align:center">
					${Util_1.util.hal2(offsetLog, jumlahAbs, kunci, path, Config_1.config.jmlPerHal, null)}
				</nav>

				<a class="tambah" href='${RouterKons_1.RouterKOns.gp_anggota_baru}'>+</a>
			</div>
			<script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
		</body>
		</html>`;
    }
    infoCari(kunci, path) {
        if ('-' == kunci || "---" == kunci) {
            return '';
        }
        else {
            return `
				<p> menampilkan pencarian berdasar kata kunci "${decodeURI(kunci)}"</p>
				<a href="${Util_1.util.getUrl(path, ['-', 0])}">tampilkan semua hasil</a>
				<hr/>
			`;
        }
    }
    daftarAnggota(anggotaAr) {
        let hasil = ``;
        if (anggotaAr.length == 0) {
            return `<div>Belum ada data</div>`;
        }
        anggotaAr.forEach((anggota) => {
            let el = `
			<div class='item list-group' id=${anggota.id}>
				<a class="list-group-item list-group-item-action" href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_edit_beranda, [anggota.id + ''])}">
					<p class=''>${anggota.nama_lengkap}</p>
				</a>
			</div>`;
            hasil += el;
        });
        return hasil;
    }
}
exports.DaftarAnggotaRenderer = DaftarAnggotaRenderer;
