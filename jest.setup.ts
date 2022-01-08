function unhandledRejectionHandler(err: Error) {
    const error = new Error('Unit Tests must not have unhandled rejections');
    
    // @ts-ignore adding a property for the original error.
    error.originalError = err;
    error.stack         = `${error.stack?.split('\n').slice(0, 2).join('\n')} \n ${err.stack}`;

    // @ts-ignore jest global
    fail(error);
}

process.on('unhandledRejection', unhandledRejectionHandler);