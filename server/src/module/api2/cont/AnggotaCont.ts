import { sm } from "../../silsilah/SilsilahModule";
import { dao } from "../dao/Dao";

export class AnggotaCont {
    async lihatProfileAnggota(id: number): Promise<ISlAnggota> {
        let anggota: ISlAnggota = await sm.ent.anggota.populate(id);
        await sm.ent.kerabat.muat(anggota);
        return anggota;
    }

    async lihatAnggota(id: number): Promise<ISlAnggota> {
        let anggotaAr: ISlAnggota[] = await dao.anggota.lihatById(id);

        return anggotaAr[0]; //TODO:
    }
}