// import { AnggotaCont } from "./AnggotaCont";
import { AnggotaCont } from "./AnggotaCont";
// import { AuthController } from "./AuthCont";
// import { BerandaCont } from "./BerandaCont";
import { Pasangan } from "./Pasangan";

export class Cont {
	// readonly auth: AuthController = new AuthController();
	readonly anggota: AnggotaCont = new AnggotaCont();
	readonly relasi: Pasangan = new Pasangan();
	// readonly beranda: BerandaCont = new BerandaCont();
}