import { ent } from "../entity/Entity";

export class AnakCont {
    async daftar(): Promise<ISlAnggota[]> {
        return await ent.anak.daftar();
    }
}