const approot = require('app-root-path');
const ping = require(`${approot}/controllers/ping`);
const error_handler = require(`${approot}/controllers/error_handler`);
const users = require('./users');

module.exports = (router) => {
    router.get('/ping', ping);
    router.use('/users', users);
    router.use(error_handler);
    return router;
};
