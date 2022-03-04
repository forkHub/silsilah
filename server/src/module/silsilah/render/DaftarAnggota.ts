import { Util, util } from "../../Util";
import { config } from "../Config";
import { RouterKOns } from "../RouterKons";
import { sm } from "../SilsilahModule";

export class DaftarAnggotaRenderer {
	render(anggotaAr: ISlAnggota[], offsetLog: number, jumlahAbs: number, kunci: string, path: string): string {
		return `
		<!DOCTYPE html>
		<html lang="id">

		<head>
			<title>${config.judul}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1">
			
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />

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

				${sm.render.renderCari(true, RouterKOns.g_anggota_daftar_kunci_hal, anggotaAr[0])}

				<hr/>

				<div class='info-cari text-align-center'>
					${this.infoCari(kunci, path)}
				</div> 

				<div class='post-cont'>
					${this.daftarAnggota(anggotaAr)}
				</div>

				<nav aria-label="Page navigation example" style="text-align:center">
					${util.hal2(offsetLog, jumlahAbs, kunci, path, config.jmlPerHal, null)}
				</nav>

				<a class="tambah" href='${RouterKOns.gp_anggota_baru}'>+</a>
			</div>
			<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
		</body>
		</html>`;
	}

	private infoCari(kunci: string, path: string): string {
		if ('-' == kunci || "---" == kunci) {
			return '';
		}
		else {
			return `
				<p> menampilkan pencarian berdasar kata kunci "${decodeURI(kunci)}"</p>
				<a href="${util.getUrl(path, ['-', 0])}">tampilkan semua hasil</a>
				<hr/>
			`
		}
	}

	private daftarAnggota(anggotaAr: ISlAnggota[]): string {
		let hasil: string = ``;

		if (anggotaAr.length == 0) {
			return `<div>Belum ada data</div>`;
		}

		anggotaAr.forEach((anggota: ISlAnggota) => {
			let el: string = `
			<div class='item list-group' id=${anggota.id}>
				<a class="list-group-item list-group-item-action" href="${util.getUrl(RouterKOns.g_anggota_id_edit_beranda, [anggota.id + ''])}">
					<p class=''>${anggota.nama_lengkap}</p>
				</a>
			</div>`;

			hasil += el;
		});

		return hasil;
	}
}