import { AnggotaCont } from "./AnggotaCont";
import { AuthController } from "./AuthCont";
import { BerandaCont } from "./BerandaCont";
import { RelasiCont } from "./RelasiCont";

export class Cont {
	readonly auth: AuthController = new AuthController();
	readonly anggota: AnggotaCont = new AnggotaCont();
	readonly relasi: RelasiCont = new RelasiCont();
	readonly beranda: BerandaCont = new BerandaCont();
}