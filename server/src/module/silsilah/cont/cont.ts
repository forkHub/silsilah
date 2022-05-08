// import { AnggotaCont } from "./AnggotaCont";
import { AuthController } from "./AuthCont";
import { BerandaCont } from "./BerandaCont";
import { PasanganCont } from "./PasanganCont";

export class Cont {
	readonly auth: AuthController = new AuthController();
	// readonly anggota: AnggotaCont = new AnggotaCont();
	readonly relasi: PasanganCont = new PasanganCont();
	readonly beranda: BerandaCont = new BerandaCont();
}