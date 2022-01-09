import express, { Express } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net'
import appRouterInstance from './routes';

const HOST_NAME = 'localhost';
const PORT = 80;

function startApp() {
    const app = express();
    configureMiddleware(app);
    configureRoutes(app);
    const server: Server = app.listen(PORT, HOST_NAME, () =>
        handleAppStart(server)
    );
}

function configureMiddleware(app: Express) {
    app.use(express.json());
    app.use(express.static(`${__dirname}/../public`)); 
}

function configureRoutes(app: Express) {
    app.use('/', appRouterInstance.getRouter())
}

function handleAppStart(server: Server) {
    const address = server.address()

    const binding = typeof address === 'string'
        ? `pipe/socket ${address}`
        : `port ${(address as AddressInfo).port}`;

    console.log(`Server listening on ${binding}.`);
}

startApp();
