const config = require('./config/config');
const express = require('express');
const addRequestId = require('express-request-id')();
const unsupportedEndpoint = require('./controllers/unsupported_endpoint');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(addRequestId);
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        const result = {};
        if (err) {
            result.status = 400;
            result.error = 'Invalid JSON body';
            return res.status(400).send(result);
        }

        next();
    });
});

app.use(config.server.endpoint, routes(express.Router()));
app.use(unsupportedEndpoint);
app.listen(config.server.port, () => {
    console.log(`Server listening to port ${config.server.host}:${config.server.port}`);
});
