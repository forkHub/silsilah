import express from "express";
import cookieSession from "cookie-session";
import { Server } from "http";
import { kons } from "./module/Kons";
import { util } from "./module/Util";
import { api } from "./module/api/Router";
import { sm } from "./module/silsilah/SilsilahModule";
import { Connection } from "./module/Connection";

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

	// app.use("/", toko.router.router)
	app.use("/", api.router);
	app.use("/", sm.router.router);

	api.mapRouter();
	sm.router.mapRouter();
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
