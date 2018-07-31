import * as express from 'express';
import * as pb from 'promise-breaker';

import * as swaggerNodeRunner from 'swagger-node-runner';
import swaggerConfig from './config';

export async function makeServer() {
    const app = express();

    // Stop swaggerNodeRunner from complaining about the lack of a config file.
    process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

    // Create a swagger middleware
    const swaggerRunner = await pb.call(done =>
        swaggerNodeRunner.create(swaggerConfig, done)
    );
    const swaggerExpress = swaggerRunner.expressMiddleware();

    // Note this line is equivalent to `app.use(swaggerExpress.middleware);`
    swaggerExpress.register(app);

    app.use((req, res, next) => {
        if(res.headersSent) {
            console.log(req.params);
            // Hack to get around
            // https://github.com/theganyo/swagger-node-runner/issues/87.
            // If headers have already been sent, it means swagger-node-runner
            // has written a response and called `next()` incorrectly.  Just drop
            // the request.
        } else {
            console.log(req.params);
            next();
        }
    });

    app.use('/', (req, res) => {
        res.send('Hello world');
    });

    return app;
}
