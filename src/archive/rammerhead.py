// Module Import //
import { createBareServer } from 'bypass-bare';
import http from 'node:http';
import express from 'express';
import createRammerhead from "rammerhead/src/server/index.js";
import path from 'node:path';
import { fileURLToPath } from "node:url";
import { dynamicPath } from "@nebula-services/dynamic";
import { hostname } from "node:os";

// Configuration //

const FilePath = './public';
const BareDirectory = '/acesspoint/';
const DefaultPort = 8080;
const app = express();
const __dirname = process.cwd();
const rh = createRammerhead();

const rammerheadScopes = [
	"/rammerhead.js",
	"/hammerhead.js",
	"/transport-worker.js",
	"/task.js",
	"/iframe-task.js",
	"/worker-hammerhead.js",
	"/messaging",
	"/sessionexists",
	"/deletesession",
	"/newsession",
	"/editsession",
	"/needpassword",
	"/syncLocalStorage",
	"/api/shuffleDict"
];
const rammerheadSession = /^\/[a-z0-9]{32}/;
function shouldRouteRh(req) {
	const url = new URL(req.url, "http://0.0.0.0");
	return (
	  rammerheadScopes.includes(url.pathname) ||
	  rammerheadSession.test(url.pathname)
	);
  }
  
  function routeRhRequest(req, res) {
	rh.emit("request", req, res);
  }

  function routeRhUpgrade(req, socket, head) {
	rh.emit("upgrade", req, socket, head);
  }

app.use((req, res, next) => {
  if(shouldRouteRh(req)) rh.emit("request", req, res); else next();
});


const httpServer = http.createServer();
app.use(express.static(FilePath));
app.use("/dynamic/", express.static(dynamicPath));
const bareServer = createBareServer(BareDirectory);

const routing = [
    { path: '/about', file: 'games.html' },
	{ path: '/blog', file: 'apps.html' }
  ];

  routing.forEach((route) => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
      } else if (shouldRouteRh(req)) {
        routeRhRequest(req, res);
      } else {
        app(req, res);
      }
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
      } else if (shouldRouteRh(req)) {
        routeRhUpgrade(req, socket, head);
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