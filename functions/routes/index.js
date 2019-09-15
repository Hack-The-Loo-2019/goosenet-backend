const approot = require('app-root-path');
const ping = require(`${approot}/controllers/ping`);
const error_handler = require(`${approot}/controllers/error_handler`);
const users_router = require('./users');
const chat_router = require('./chat');
const management_router = require('./managements');
const subscription_code_router = require('./subscription_codes');

module.exports = (router) => {
    router.get('/ping', ping);
    router.use('/users', users_router);
    router.use('/chat', chat_router);
    router.use('/management_router', management_router);
    router.use('/subscription_code', subscription_code_router);
    router.use(error_handler);
    return router;
};
