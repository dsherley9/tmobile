import express, { Express } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net'
import appRouterInstance from './routes';
import BearerAuth from './utility/BearerAuth';
import DotEnv from 'dotenv';
DotEnv.config();

const HOST_NAME = 'localhost';
const PORT = 80;

class ExpressApp {
    public app: Express = express();
    public server?: Server;
    public host = process.env.HOST ?? 'localhost';
    public port = Number(process.env.PORT) ?? 80;

    public start(): void {
        this.configureMiddleware();
        this.configureRoutes();
        this.server = this.app.listen(this.port, this.host, this.handleAppStart.bind(this));
    }
    
    public configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.static(`${__dirname}/../public`)); 
        this.app.use(BearerAuth.verfiyToken);
    }
    
    public configureRoutes(): void {
        this.app.use('/', appRouterInstance.getRouter())
    }
    
    public handleAppStart(): void {
        const address = this.server?.address()
    
        const binding = typeof address === 'string'
            ? `pipe/socket ${address}`
            : `port ${(address as AddressInfo).port}`;
    
        console.log(`Server listening on ${binding}.`);
    }
}

export default ExpressApp;
