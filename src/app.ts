import express from 'express';

function startApp() {
    const app = express();

    const server = app.listen(8081, () => {
        const host = server.address();
    });
}

startApp();