import { AnakEnt } from "./AnakEnt";

class Entity {
    private _anak: AnakEnt = new AnakEnt();
    public get anak(): AnakEnt {
        return this._anak;
    }


}

export var ent: Entity = new Entity();