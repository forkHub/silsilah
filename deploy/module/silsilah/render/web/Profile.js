"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const Util_1 = require("../../../Util");
const Config_1 = require("../../Config");
const RouterKons_1 = require("../../RouterKons");
class Profile {
    render(anggota) {
        return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<title>${Config_1.config.judul}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">

			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/font/css/fontello.css' rel='stylesheet' />
			<link rel='stylesheet' href="/css/umum.css?r=${Util_1.util.randId}" />
		</head>
		
		<body>
			<div class="cont container profile">

				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a class='beranda' href="/">🏠</a></li>
						<li class="breadcrumb-item active" aria-current="page">profile</li>
					</ol>
				</nav>
		
				<hr />
		
				<div class="form-group">
					<h5>foto:</h5>
					<img class="img-asli" src="${(anggota.foto != '') ? anggota.foto : '/gbr/profile128.png'}">
				</div>
		
				<div class='profile'>
					<hr/>
					<h5>profil:</h5>
		
					<p class="text-secondary mb-1 font-weight-bold">nama:</p>
					<p class="text-muted font-size-sm">${anggota.nama}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">nama lengkap:</p>
					<p class="text-muted font-size-sm">${Util_1.util.stringNull(anggota.nama_lengkap)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">jkl:</p>
					<p class="text-muted font-size-sm">${anggota.jkl}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">alamat:</p>
					<p class="text-muted font-size-sm">${Util_1.util.stringNull(anggota.alamat)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-lahir:</p>
					<p class="text-muted font-size-sm">${Util_1.util.dateTimeStamp(anggota.tgl_lahir)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-meninggal:</p>
					<p class="text-muted font-size-sm">${Util_1.util.dateTimeStamp(anggota.tgl_meninggal)}</p>
				
					<p class="text-secondary mb-1 font-weight-bold">fb:</p>
					<p class="text-muted font-size-sm">${this.renderLink(anggota.fb)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">wa:</p>
					<p class="text-muted font-size-sm">${Util_1.util.stringNull(anggota.wa)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">instagram:</p>
					<p class="text-muted font-size-sm">${this.renderLink(anggota.instagram)}</p>
				</div>

				<div class='pasangan'>
					<hr/>
					<h5>pasangan:</h5>
					${this.renderPasangan(anggota)}
				</div>

				<div class='link'>
					<hr/>
					<h5>tautan:</h5>
					${this.renderTautan(anggota)}
				</div>


				<div class='anak'>
					<hr/>
					<h5>anak:</h5>
					${this.renderDaftarAnak(anggota.anak)}
				</div>

				<div class='kerabat'>
					<hr/>
					<h5>kerabat:</h5>
					${this.renderKerabat(anggota)}
				</div>
				
			</div>

			<script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
		</body>
		
		</html>
        `;
    }
    renderLink(link) {
        return `<a href="${Util_1.util.stringHrefNull(link)}">${Util_1.util.stringNull(link)}</a>`;
    }
    renderTautan(anggota) {
        return `<a href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_beranda_id, [anggota.id])}">tautan silsilah</a>`;
    }
    renderPasangan(anggota) {
        if (anggota.pas) {
            return `
			<a class="pasangan" href='${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_beranda_lihat_id, [anggota.pas.id])}'>${anggota.pas.nama}</a>`;
        }
        else {
            return `<p class="text-muted font-size-sm">tidak ada data</p>`;
        }
    }
    renderKerabat(anggota) {
        let hasil = '';
        hasil += this.renderDaftar(anggota.mbah, 'mbah');
        hasil += this.renderDaftar(anggota.ortu, 'orang tua');
        hasil += this.renderLek(anggota);
        hasil += this.renderDaftar(anggota.saudara, 'saudara');
        hasil += this.renderDaftar(anggota.sepupu, 'sepupu');
        hasil += this.renderDaftar(anggota.ponakan, 'ponakan');
        hasil += this.renderDaftar(anggota.cucu, 'cucu');
        return hasil;
    }
    tglLebihBesar(tgl1, tgl2) {
        let tgl1a = new Date(tgl1);
        let tgl2a = new Date(tgl2);
        if (tgl1a > tgl2a)
            return true;
        return false;
    }
    renderLek(anggota) {
        let hasil = '';
        let dhe = '';
        anggota.lek.forEach((item) => {
            if (item.jkl == 'l') {
                if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
                    dhe = 'pakdhe';
                }
                else {
                    dhe = 'paklek';
                }
                hasil += this.renderDaftar([item], dhe);
            }
            else {
                if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
                    dhe = 'budhe';
                }
                else {
                    dhe = 'bulek';
                }
                hasil += this.renderDaftar([item], dhe);
            }
        });
        return hasil;
    }
    renderDaftar(daftar, label) {
        let hasil = '';
        daftar.forEach((anggota) => {
            let el = `
			<div class='margin-bottom-8' id=${anggota.id}>
				<a class="" href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_beranda_lihat_id, [anggota.id])}">${anggota.nama_lengkap} (${label})</a>
			</div>`;
            hasil += el;
        });
        return hasil;
    }
    renderDaftarAnak(anggotaAr) {
        let hasil = ``;
        if (anggotaAr.length == 0) {
            return `<p class="text-muted font-size-sm">tidak ada data</p>`;
        }
        anggotaAr.forEach((anggota) => {
            let el = `
			<div class='margin-bottom-8' id=${anggota.id}>
				<a class="" href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_beranda_lihat_id, [anggota.id])}">${anggota.nama_lengkap}</a>
			</div>`;
            hasil += el;
        });
        return hasil;
    }
}
exports.Profile = Profile;
