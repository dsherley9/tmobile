import express, { Request, Response, Router } from 'express';
import IAppRouter from '../IAppRouter';
import Devs from '../../data/devs.json';
import { Dev } from '../../models/dev';
import { InvalidRequestResponse, SuccessResponse } from '../../models/responses';
import { StatusCodes } from 'http-status-codes';

class DevsRouter implements IAppRouter {
    getRouter(): Router {
        const router = express.Router();
        router.get('/status', this.status.bind(this))
        router.get('/all', this.getAll.bind(this));
        router.get('/:id', this.getById.bind(this));
        router.post('/', this.createDev.bind(this));
        router.put('/', this.updateDev.bind(this));
        router.delete('/', this.deleteDev.bind(this));
        return router;
    }

    public status(req: Request, res: Response) {
        const success: SuccessResponse = {
            data: [],
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: 'Everything is working!'
        };

        res.status(StatusCodes.OK).send(success);
    }


    public getAll(_req: Request, res: Response) {
        res.status(200).json(Devs);
    }

    public getById(_req: Request, res: Response) {
        res.status(200).json(Devs);
    }

    public createDev(req: Request, res: Response) {
        const { body }: { body: Dev } = req;

        if (!body?.name) {
            const invalid: InvalidRequestResponse = {
                statusCode   : StatusCodes.BAD_REQUEST,
                statusMessage: 'Name is required',
                errors       : []
            };
            res.status(invalid.statusCode).send(invalid);
            return;
        }

        const success: SuccessResponse<Dev> = {
            data: [body],
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: `Successfully added ${body.name}!`
        };

        res.status(success.statusCode).send(success);
    }

    public updateDev(req: Request, res: Response) {
        const { body }: { body: Dev } = req;

        if (!body?.id) {
            const invalid: InvalidRequestResponse = {
                statusCode   : StatusCodes.BAD_REQUEST,
                statusMessage: 'Id is required',
                errors       : []
            };
            res.status(invalid.statusCode).send(invalid);
            return;
        }

        const success: SuccessResponse<Dev> = {
            data: [body],
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: `Successfully updated ${body.name}!`
        };

        res.status(success.statusCode).send(success);
    }

    public deleteDev(req: Request, res: Response) {
        const { body }: { body: Dev } = req;

        if (!body?.id) {
            const invalid: InvalidRequestResponse = {
                statusCode   : StatusCodes.BAD_REQUEST,
                statusMessage: 'Id is required',
                errors       : []
            };
            res.status(invalid.statusCode).send(invalid);
            return;
        }

        const success: SuccessResponse<Dev> = {
            data: [body],
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: `Successfully deleted ${body.name}!`
        };

        res.status(success.statusCode).send(success);
    }
}

const devsRouterInstance = new DevsRouter();
export default devsRouterInstance;
export { devsRouterInstance, DevsRouter }