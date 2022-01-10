import { StatusCodes } from 'http-status-codes'

type BaseResponse = {
    statusCode: StatusCodes
    statusMessage: String
};

type BaseError<T = any> = BaseResponse & {
    errors: T[]
}

type Links = {
    self: String,
    next: String,
    last: String
};

type SuccessResponse<T = any> = BaseResponse & {
    data: T[],
    links: Links
};

type InvalidRequestResponse = BaseError;

type NotFoundRespose = BaseError;

export { SuccessResponse, InvalidRequestResponse, NotFoundRespose };