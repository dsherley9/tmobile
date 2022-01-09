import express, { Router } from 'express';
import ApiRouter from './api';
import IAppRouter from './IAppRouter'

class AppRouter implements IAppRouter {
    getRouter(): Router {
        const router = express.Router();
        router.use('/api', ApiRouter.getRouter())
        return router;
    }
}

const appRouterInstance = new AppRouter();
export default appRouterInstance
export { appRouterInstance, AppRouter }