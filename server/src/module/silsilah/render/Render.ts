import { Param } from "../../Param";
import { Auth } from "./auth/Auth";
// import { PilihAnggotaGenerik } from "./rel/PilihAnggotaGenerik";
import { Silsilah } from "./Silsilah";
import { RouterKOns } from "../RouterKons";
import { util } from "../../Util";
import { Profile } from "./Profile";
// import { Web } from "./Web";

export class Render {
	readonly auth: Auth = new Auth();

	readonly silsilah: Silsilah = new Silsilah();
	readonly profile: Profile = new Profile();

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
						action="${util.getUrl(RouterKOns.uploadFoto, [anggota.id])}"
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