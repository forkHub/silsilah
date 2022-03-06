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
				if (this.api.data.url == config.server + this.api.data.HAL_PROFILE) {
					console.log('load profile');
					//loading profile
					this.loadProfile().then().catch((e) => {
						console.warn(e);
					});
				}
				else {

				}
			}, () => {
				console.log('getter');
				return this.api.data.url;
			});
		}

		async loadProfile(): Promise<void> {
			// let anggota: ISlAnggota = null;
			let xml: XMLHttpRequest = await ha.comp.Util.Ajax('post', ha.sl.config.nodeServer + ha.sl.RouterAPI2Kons.api_profile_lihat, '');

			if (200 == xml.status) {
				console.log(JSON.parse(xml.responseText));
			}
			else if (401 == xml.status) {
				console.log('belum login');
			}
			else {
				console.warn('error', xml.statusText);
			}
		}
	}
}

window.onload = () => {
	let profile: ha.sl.Profile = new ha.sl.Profile();
	profile.init();
}