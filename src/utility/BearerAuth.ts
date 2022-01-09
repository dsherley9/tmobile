import users from '../data/users';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

class BearerAuth {
    public static verfiyToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers['authorization'];
  
        if (!authHeader) {
            res.send(StatusCodes.UNAUTHORIZED);
            return;
        }

        const bearer = authHeader?.split(' ') ?? [];
        const bearerToken = bearer[1];
        const isAUser = users.some(token => token === bearerToken);

        if (!isAUser) {
            res.send(StatusCodes.UNAUTHORIZED);
            return;
        }

        next();
    }
}

export default BearerAuth;