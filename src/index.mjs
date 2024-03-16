// Module Import //
import { createBareServer } from 'bypass-bare';
import http from 'node:http';
import express from 'express';
import path from 'node:path';
import { dynamicPath } from "@nebula-services/dynamic";
import { hostname } from "node:os";
// Configuration //

const FilePath = './public';
const BareDirectory = '/acesspoint/';
const __dirname = process.cwd();
const DefaultPort = 8080;

const httpServer = http.createServer();
const app = express();

app.use(express.static(FilePath));
app.use("/dynamic/", express.static(dynamicPath));
const bareServer = createBareServer(BareDirectory);

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		app(req, res);
	}
});

const routing = [
    { path: '/about', file: 'games.html' },
	  { path: '/blog', file: 'apps.html' }
  ];

  routing.forEach((route) => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	const address = httpServer.address();
    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
      `\thttp://${
        address.family === "IPv6" ? `[${address.address}]` : address.address
      }:${address.port}`
    );
});



httpServer.listen({
	port: DefaultPort,
});