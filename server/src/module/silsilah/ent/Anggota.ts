import { sm } from "../SilsilahModule";

export class Anggota {

	async populate(id: number,): Promise<ISlAnggota> {
		let anggotaAr: ISlAnggota[] = await sm.dao.anggota.lihat(id);
		let anggota: ISlAnggota = anggotaAr[0]

		//pasangan info
		if (anggota.rel_id > 0) {
			let pasAr: ISlAnggota[] = await sm.dao.pasangan.lihatPasangan(anggota.id, anggota.rel_id);
			let pas: ISlAnggota = pasAr[0];
			anggota.pas = pas;
			anggota.rel = (await sm.dao.rel.byId(anggota.rel_id))[0];
			anggota.anak = (await sm.dao.anak.daftarAnak(anggota.rel_id))
		}
		else {
			anggota.anak = [];
		}

		return anggota;
	}
}