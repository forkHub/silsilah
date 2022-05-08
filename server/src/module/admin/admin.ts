import { Cont } from "./cont/cont";
import { Render } from "./render/Render";

export class Admin {
    readonly cont: Cont = new Cont();
    readonly render: Render = new Render();
}