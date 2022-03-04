import { AnakCont } from "./AnakCont";

class Cont {
    private _anak: AnakCont = new AnakCont();
    public get anak(): AnakCont {
        return this._anak;
    }


}

export var cont: Cont = new Cont();