import { sm } from "../../silsilah/SilsilahModule";

export class AnggotaCont {
    async lihatProfileAnggota(id: number): Promise<ISlAnggota> {
        let anggota: ISlAnggota = await sm.ent.anggota.populate(id);
        await sm.ent.kerabat.muat(anggota);
        return anggota;
    }
}