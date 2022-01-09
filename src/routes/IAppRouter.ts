import { Router } from 'express';

export default interface IAppRouter {
    getRouter(): Router
}