import express, { Express } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net'
import appRouterInstance from './routes';
import BearerAuth from './utility/BearerAuth';

const HOST_NAME = 'localhost';
const PORT = 80;

class ExpressApp {
    public app: Express = express();
    public server?: Server;

    public start(): void {
        this.configureMiddleware();
        this.configureRoutes();
        this.server = this.app.listen(PORT, HOST_NAME, this.handleAppStart.bind(this));
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
