import { Admin } from "../admin/admin";
import { Kons } from "../Kons";
import { AuthController } from "./cont/AuthCont";
import { Cont } from "./cont/cont";
import { Dao } from "./dao/Dao";
import { Entity } from "./ent/Ent";
import { Render } from "./render/Render";
import { Router } from "./Router";

class SM {
	readonly cont: Cont = new Cont();
	readonly router: Router = new Router()
	readonly render: Render = new Render();
	readonly dao: Dao = new Dao();
	readonly kons: Kons = new Kons();
	readonly auth: AuthController = new AuthController();
	readonly ent: Entity = new Entity();
	readonly admin: Admin = new Admin();

}

export var sm: SM = new SM();