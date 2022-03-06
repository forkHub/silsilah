namespace ha.sl {
	export class Profile {
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
	}
}

window.onload = () => {
	let profile: ha.sl.Profile = new ha.sl.Profile();
	profile.init();
}