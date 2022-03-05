"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBeranda = void 0;
const Param_1 = require("../../Param");
const Util_1 = require("../../Util");
const Config_1 = require("../Config");
const RouterKons_1 = require("../RouterKons");
const SilsilahModule_1 = require("../SilsilahModule");
class EditBeranda {
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
			<div class="cont container forum">
		
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a class='profile' href="/">🏠</a></li>
						<li class="breadcrumb-item"><a class='profile' href="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_daftar, [anggota.id])}">daftar</a></li>
						<li class="breadcrumb-item active" aria-current="page">edit</li>
					</ol>
				</nav>
		
				<hr />
		
				<div class="form-group">
					<h5>gambar:</h5>
					<img class="img-asli" src="${(anggota.foto != '') ? anggota.foto : '/gbr/thumb.png'}">
					<div class="thumb-cont disp-none"></div>
		
					<button type="button" class="btn btn-primary ganti-gambar" ${Param_1.Param.HA_TOGGLE}="div.upload-gambar"
						${Param_1.Param.HA_KLIK}>Ganti Gambar
					</button>
				</div>
		
				<div class='profile'>
					<hr/>
					<h5>profil:</h5>
		
					<p class="text-secondary mb-1 font-weight-bold">nama:</p>
					<p class="text-muted font-size-sm">${anggota.nama}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">nama lengkap:</p>
					<p class="text-muted font-size-sm">${anggota.nama_lengkap}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">jkl:</p>
					<p class="text-muted font-size-sm">${anggota.jkl}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">alamat:</p>
					<p class="text-muted font-size-sm">${Util_1.util.renderValue(anggota.alamat)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-lahir:</p>
					<p class="text-muted font-size-sm">${Util_1.util.dateTimeStamp(anggota.tgl_lahir)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">tgl-meninggal:</p>
					<p class="text-muted font-size-sm">${Util_1.util.dateTimeStamp(anggota.tgl_meninggal)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">fb:</p>
					<p class="text-muted font-size-sm">${Util_1.util.renderValue(anggota.fb)}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">wa:</p>
					<p class="text-muted font-size-sm">${anggota.wa}</p>
		
					<p class="text-secondary mb-1 font-weight-bold">instagram:</p>
					<p class="text-muted font-size-sm">${Util_1.util.renderValue(anggota.instagram)}</p>
				</div>
		
				<div class='tombol'>
		
					<div class='col-12 col-sm-6'>
						<button class="btn btn-primary btn-block" ${Param_1.Param.HA_KLIK}
							${Param_1.Param.HA_GET}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_info_edit, [anggota.id + ''])}">
							edit
						</button>
					</div>
		
					<div class="col-12 col-sm-6">
						<button class="btn btn-danger btn-block" ${Param_1.Param.HA_KLIK}
							${Param_1.Param.HA_POST}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.p_anggota_hapus_id, [anggota.id + ''])}"
							${Param_1.Param.HA_URL}="${RouterKons_1.RouterKOns.g_anggota_daftar}" ${Param_1.Param.HA_KF}="Apakah data akan dihapus?"
							${Param_1.Param.HA_DLG}="data sudah berhasil dihapus?">
							hapus
						</button>
					</div>
		
				</div>
		
				<hr />
		
				${this.renderPasangan(anggota)}
				${this.renderPasanganTbl(anggota)}
		
				<hr />
		
				<h5>data anak:</h5>
				${this.renderDaftarAnak(anggota.anak)}
				${this.renderTombolAnak(anggota)}
		
			</div>
		
			${SilsilahModule_1.sm.render.renderUpload(anggota.foto ? anggota.foto : "/gbr/thumb.png", anggota)}
		
		
			<script src="/lib/load-image.all.min.js"></script>
			<script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
			<script type="module" src="/js${Util_1.Util.revisi}/silsilah/PhotoUploadPage.js?r=${Util_1.util.randId}"></script>
		</body>
		
		</html>
        `;
    }
    renderTombolAnak(anggota) {
        let hasil = '';
        if (anggota.rel_id > 0) {
            hasil = `
					<button
						class="btn btn-primary col-12 col-sm-6"
						${Param_1.Param.HA_KLIK} 
						${Param_1.Param.HA_GET}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_anak_tambah, [anggota.id + '', '0'])}"> 
							tambah anak
					</button>`;
        }
        return hasil;
    }
    renderPasangan(anggota) {
        if (anggota.pas) {
            return `
			<h5>data pasangan:</h5>
			<p class="text-secondary mb-1 font-weight-bold">nama:</p>
			<p class="text-muted font-size-sm">${anggota.pas.nama}</p>`;
        }
        else {
            return `<h5>data pasangan:</h5>
			<p>belum ada data pasangan</p>`;
        }
    }
    renderDaftarAnak(anggotaAr) {
        let hasil = ``;
        if (anggotaAr.length == 0) {
            return `<div>Belum ada data</div>`;
        }
        anggotaAr.forEach((anggota) => {
            let el = `
			<div class='item list-group' id=${anggota.id}>
				<a class="list-group-item list-group-item-action" href="#">
					<div class='display-flex'>
						<p class='flex-grow-1'>${anggota.nama_lengkap}</p>
						<button 
							class="icon-trash-empty btn btn-danger" 
							${Param_1.Param.HA_KLIK} 
							${Param_1.Param.HA_KF}="data akan dihapus?" 
							${Param_1.Param.HA_POST}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.p_anggota_id_ortu_edit_id, [anggota.id, 0])}"
							${Param_1.Param.HA_RELOAD}>
						</button>
					</div>
				</a>
			</div>`;
            hasil += el;
        });
        return hasil;
    }
    renderPasanganTbl(anggota) {
        let tombol = ``;
        let tambah = false;
        //punya relasi gak punya pasangan
        if (anggota.rel_id > 0) {
            if (anggota.pas != null) {
                //pass
            }
            else {
                tambah = true;
            }
        }
        else {
            if (anggota.pas != null) {
                throw Error('pasangan invalid');
            }
            else {
                tambah = true;
            }
        }
        if (tambah) {
            tombol = `
					<button
						class="btn btn-primary col-12 col-sm-6"
						${Param_1.Param.HA_KLIK} 
						${Param_1.Param.HA_GET}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_calon_pas_cari, [anggota.id])}"> 
							tambah pasangan
					</button>`;
        }
        else {
            tombol = `
				<button
					class="btn btn-primary col-12 col-sm-6"
					${Param_1.Param.HA_KLIK} 
					${Param_1.Param.HA_POST}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.p_anggota_id_rel_edit_id, [anggota.pas.id, 0])}"	
					${Param_1.Param.HA_RELOAD}> 
						hapus pasangan
				</button>`;
        }
        return tombol;
    }
}
exports.EditBeranda = EditBeranda;
