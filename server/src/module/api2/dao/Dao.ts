import { AnakDao } from "./AnakDao";


class Dao {
    private _anak: AnakDao = new AnakDao();
    public get anak(): AnakDao {
        return this._anak;
    }

}

export var dao: Dao = new Dao();