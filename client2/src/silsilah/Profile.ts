namespace ha.sl {
	class Data {

	}

	export class Profile {
		readonly data: Data = new Data();
		private _api: Silsilah;
		public get api(): Silsilah {
			return this._api;
		}
		public set api(value: Silsilah) {
			this._api = value;
		}

		init(): void {
			console.log('get api');
			console.log(window.parent);
			console.log(window.parent.window);
			this.api = (window.parent.window as any).api;
			this.api.data.reg(() => {
				console.log('setter');
				if (window.top.location.hash == this.api.data.HAL_PROFILE) {
					console.log('load profile');
					//loading profile
					this.loadProfile().then().catch((e) => {
						console.warn(e);
					});
				}
				else {
					console.log('hash tidak cocok');
				}
			}, () => {
				console.log('getter');
				return this.api.data.url;
			});
		}

		scanBind(): void {
			//TODO:
			//ambil semua element dengan data-bind
			//buat bind
			//	getter data['nama']
			//	setter => inner html

			//optional => bind manual buat daftar
		}

		async loadProfile(): Promise<void> {
			let data: any = {
				id: this.api.data.anggotaAktifId
			};

			let url: string = ha.sl.config.nodeServer + ha.sl.RouterAPI2Kons.api_profile_lihat;

			let xml: XMLHttpRequest = await ha.comp.Util.Ajax('post', url, JSON.stringify(data));

			if (200 == xml.status) {
				console.log("sukses");
				console.log(xml.responseText);
				console.log(JSON.parse(xml.responseText));
			}
			else if (401 == xml.status) {
				console.log('belum login');
			}
			else {
				console.warn('error', xml.statusText);
				ha.comp.dialog.tampil('Ada kesalahan di server!');
			}
		}

		renderPasangan(anggota: ISlAnggota): string {
			if (anggota.pas) {
				return `
				<a class="pasangan" href='${ha.comp.Util.getUrl(RouterKOns.g_beranda_lihat_id, [anggota.pas.id])}'>${anggota.pas.nama}</a>`;
			}
			else {
				return `<p class="text-muted font-size-sm">tidak ada data</p>`;
			}
		}

		private tglLebihBesar(tgl1: string, tgl2: string): boolean {
			let tgl1a: Date = new Date(tgl1);
			let tgl2a: Date = new Date(tgl2);

			if (tgl1a > tgl2a) return true;
			return false;
		}

		private renderLek(anggota: ISlAnggota): string {
			let hasil: string = '';
			let dhe: string = '';

			anggota.lek.forEach((item: ISlAnggota) => {
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

		renderKerabat(anggota: ISlAnggota): string {
			let hasil: string = '';

			hasil += this.renderDaftar(anggota.mbah, 'mbah');
			hasil += this.renderDaftar(anggota.ortu, 'orang tua');
			hasil += this.renderLek(anggota);
			hasil += this.renderDaftar(anggota.saudara, 'saudara');
			hasil += this.renderDaftar(anggota.sepupu, 'sepupu');
			hasil += this.renderDaftar(anggota.ponakan, 'ponakan');
			hasil += this.renderDaftar(anggota.cucu, 'cucu');

			return hasil;
		}

		//render daftar kerabat detail
		private renderDaftar(daftar: ISlAnggota[], label: string): string {
			let hasil: string = '';

			daftar.forEach((anggota: ISlAnggota) => {
				let el: string = `
				<div class='margin-bottom-8' id=${anggota.id}>
					<a class="" href="${ha.comp.Util.getUrl(RouterKOns.g_beranda_lihat_id, [anggota.id])}">${anggota.nama_lengkap} (${label})</a>
				</div>`;

				hasil += el;
			});

			return hasil;
		}

		renderDaftarAnak(anggotaAr: ISlAnggota[]): string {

			let hasil: string = ``;

			if (anggotaAr.length == 0) {
				return `<p class="text-muted font-size-sm">tidak ada data</p>`;
			}

			anggotaAr.forEach((anggota: ISlAnggota) => {
				let el: string = `
				<div class='margin-bottom-8' id=${anggota.id}>
					<a class="" href="${ha.comp.Util.getUrl(RouterKOns.g_beranda_lihat_id, [anggota.id])}">${anggota.nama_lengkap}</a>
				</div>`;

				hasil += el;
			});

			return hasil;
		}
	}
}

window.onload = () => {
	let profile: ha.sl.Profile = new ha.sl.Profile();
	profile.init();
}