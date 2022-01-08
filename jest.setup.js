function unhandledRejectionHandler(err) {
    const error = new Error('Unit Tests must not have unhandled rejections');
    error.originalError = err;
    error.stack         = `${error.stack?.split('\n').slice(0, 2).join('\n')} \n ${err.stack}`;
    fail(error);
}

process.on('unhandledRejection', unhandledRejectionHandler);