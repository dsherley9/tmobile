import express, { Router } from 'express';
import IAppRouter from '../IAppRouter'
import devsRouterInstance from './devs';

class ApiRouter implements IAppRouter {
    getRouter(): Router {
        const router = express.Router();
        router.use('/devs', devsRouterInstance.getRouter())
        return router;
    }
}

export default new ApiRouter();
export { ApiRouter }