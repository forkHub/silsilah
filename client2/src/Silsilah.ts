class Silsilah {
	readonly HAL_PROFILE: string = '#hal_depan';

	init(): void {

	}

	pindah(hal: string): void {
		if (this.HAL_PROFILE == hal) {

		}
		else {
			throw new Error('');
		}
	}

	get halProfile(): HTMLIFrameElement {
		return ha.comp.Util.getEl(this.HAL_PROFILE) as HTMLIFrameElement;
	}
}

window.onload = () => {
	let silsilah = new Silsilah();
	silsilah.init();
	(window as any).api = silsilah;
}