import { Param } from "../../Param";
import { AnggotaBaru } from "./AnggotaBaru";
import { Auth } from "./auth/Auth";
import { DaftarAnggotaRenderer } from "./DaftarAnggota";
import { EditProfileAnggota } from "./EditProfileAnggota";
import { EditBeranda } from "./EditBeranda";
import { PilihAnggota } from "./rel/PilihAnggota";
import { Silsilah } from "./web/Silsilah";
import { RouterKOns } from "../RouterKons";
import { util } from "../../Util";
import { Web } from "./web/Web";

export class Render {
	readonly auth: Auth = new Auth();
	readonly daftarAnggota: DaftarAnggotaRenderer = new DaftarAnggotaRenderer();
	readonly editBeranda: EditBeranda = new EditBeranda();
	readonly editProfileAnggota: EditProfileAnggota = new EditProfileAnggota();
	readonly anggotaBaru: AnggotaBaru = new AnggotaBaru();
	readonly web: Web = new Web();

	readonly pilihAnggota: PilihAnggota = new PilihAnggota();
	readonly silsilah: Silsilah = new Silsilah();

	public renderCari(status: boolean, path: string, anggota: ISlAnggota): string {
		if (!status) return '';

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
			</div>`
	}

	//TODO: [dev] form action upload
	renderUpload(thumb: string, anggota: ISlAnggota): string {

		return `
			<div class='background disp-none upload-gambar padding-16'>
				<div class='box padding-8 bg-putih'>
					<div class='text-align-right'>
						<button class='btn btn-primary tutup' ${Param.HA_KLIK} ${Param.HA_TOGGLE}="div.upload-gambar">X</button>
					</div>

					<form 
						action="${util.getUrl(RouterKOns.p_anggota_id_gbr_upload, [anggota.id])}"
						method="post"
						class='cont upload'
						${Param.HA_MANUAL}
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