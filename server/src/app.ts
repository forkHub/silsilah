import express from "express";
import cookieSession from "cookie-session";
import { Server } from "http";
import { kons } from "./module/Kons";
import { util } from "./module/Util";
// import { api } from "./module/api/Router";
import { sm } from "./module/silsilah/SilsilahModule";
import { Connection } from "./module/Connection";
import { api2 } from "./module/api2/Api2";
import { config } from "./module/silsilah/Config";

const app: express.Express = express();
const port: number = 3000;

try {
	util.buatRandom();
	util.baseDir = __dirname;


	app.use(express.static(__dirname + kons.folder_public));
	app.use(express.json({ limit: '5mb' }));
	app.use(cookieSession({
		name: 'toko_session',
		keys: ['Auni_202002_cookie_session'],
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 2
	}));

	app.options('*', function (_req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		res.sendStatus(200);
	});

	let allowedDomains: string[] = [];

	if (config.dev) {
		allowedDomains.push('htp://localhost:80');
		allowedDomains.push('htp://localhost');
	}

	app.use(function (_req, res, next) {
		if (allowedDomains.indexOf(_req.headers.origin) > -1) {
			res.header("Access-Control-Allow-Origin", `${_req.headers.origin}`);
		}
		else {
			//nothing
		}
		res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		res.header("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,POST,PUT");
		res.status(200);
		next();
	});

	// app.use("/", toko.router.router)
	// app.use("/", api.router);
	app.use("/", sm.router.router);
	app.use("/", api2.router.router);

	// api.mapRouter();
	sm.router.mapRouter();
	api2.router.mapRouter();
	// toko.router.mapRouter();

	app.use((_req: express.Request, _resp: express.Response, _next: Function) => {
		_resp.status(404).send(`<html><head><title>404</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>Halaman Tidak Ditemukan</body></html>`);
	})

	process.on('SIGTERM', () => {
		try {

			Connection.pool.end((err) => {
				if (err) {
					console.error;
				}
				else {

				}
			});

		} catch (e) {
			console.error;
		}

	});

	Connection.connect();
}
catch (e) {
	console.log("========================================");
	console.error(e);
	console.log("========================================");
}

export const server: Server = app.listen(port, () => {
	console.log('app started');
});
