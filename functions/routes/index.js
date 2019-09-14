const approot = require('app-root-path');
const ping = require(`${approot}/controllers/ping`);
const error_handler = require(`${approot}/controllers/error_handler`);

module.exports = (router) => {
    router.get('/ping', ping);
    router.use(error_handler);
    return router;
};
