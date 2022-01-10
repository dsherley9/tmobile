import express, { Request, Response, Router } from 'express';
import IAppRouter from '../IAppRouter';
import Devs from '../../data/devs';
import { Dev } from '../../models/dev';
import { InvalidRequestResponse, NotFoundRespose, SuccessResponse } from '../../models/responses';
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


    public getAll(req: Request, res: Response) {
        const success: SuccessResponse<Dev> = {
            data: Devs,
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: `Success`
        };

        res.status(success.statusCode).send(success);
    }

    public getById(req: Request, res: Response) {
        // @ts-expect-error handler for express route
        const { id }: { id: String} = req.params;
        
        const dev = Devs.find(dev => dev?.id === id);
        if (!dev) {
            const notFound: NotFoundRespose = {
                statusCode: StatusCodes.NOT_FOUND,
                statusMessage: 'Not found',
                errors: []
            }
            
            res.status(notFound.statusCode).send(notFound);
        }


        const success: SuccessResponse<Dev> = {
            data: [dev as Dev],
            links: {
                self: `${req.protocol}://${req.hostname}${req.originalUrl}`,
                next: '',
                last: ''
            },
            statusCode: StatusCodes.OK,
            statusMessage: `Success`
        };

        res.status(success.statusCode).send(success);
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