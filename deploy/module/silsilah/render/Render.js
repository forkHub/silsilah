"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = void 0;
const Param_1 = require("../../Param");
const AnggotaBaru_1 = require("./AnggotaBaru");
const Auth_1 = require("./auth/Auth");
const DaftarAnggota_1 = require("./DaftarAnggota");
const EditProfileAnggota_1 = require("./EditProfileAnggota");
const EditBeranda_1 = require("./EditBeranda");
const PilihAnggota_1 = require("./rel/PilihAnggota");
const Silsilah_1 = require("./web/Silsilah");
const RouterKons_1 = require("../RouterKons");
const Util_1 = require("../../Util");
const Web_1 = require("./web/Web");
class Render {
    auth = new Auth_1.Auth();
    daftarAnggota = new DaftarAnggota_1.DaftarAnggotaRenderer();
    editBeranda = new EditBeranda_1.EditBeranda();
    editProfileAnggota = new EditProfileAnggota_1.EditProfileAnggota();
    anggotaBaru = new AnggotaBaru_1.AnggotaBaru();
    web = new Web_1.Web();
    pilihAnggota = new PilihAnggota_1.PilihAnggota();
    silsilah = new Silsilah_1.Silsilah();
    renderCari(status, path, anggota) {
        if (!status)
            return '';
        return `
			<div class="" id="navbarSupportedContent">
				<form 
					method="get" 
					type="cari" 
					class="d-flex" 
					action="${path}"
					anggota-id="${anggota ? anggota.id : '0'}"
					>
					<input class="form-control me-2" type="search" name="cari" placeholder="Search" aria-label="Search" required>
					<button class="btn btn-outline-success" type="submit">Cari</button>
				</form>
			</div>`;
    }
    //TODO: [dev] form action upload
    renderUpload(thumb, anggota) {
        return `
			<div class='background disp-none upload-gambar padding-16'>
				<div class='box padding-8 bg-putih'>
					<div class='text-align-right'>
						<button class='btn btn-primary tutup' ${Param_1.Param.HA_KLIK} ${Param_1.Param.HA_TOGGLE}="div.upload-gambar">X</button>
					</div>

					<form 
						action="${Util_1.util.getUrl(RouterKons_1.RouterKOns.p_anggota_id_gbr_upload, [anggota.id])}"
						method="post"
						class='cont upload'
						${Param_1.Param.HA_MANUAL}
						>

						<div class="form-group">
							<label for="thumb">Gambar:</label><br/>
							<img class="img-ori disp-block" src="${thumb}"><br/>
							<input type="file">
						</div>
					
						<div class='thumb-cont disp-none'>
						</div>

						<div class='foto-cont disp-none'>
						</div>
						
						<button type='submit' class='btn btn-primary upload'>Upload</button>
					</form>
				</div>
			</div>

		`;
    }
}
exports.Render = Render;
