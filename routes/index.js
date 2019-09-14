const approot = require('app-root-path');
const chatRouter = require('./chat');
const errorHandler = require(`${approot}/controllers/error_handler`);

module.exports = (router) => {
    router.get('/ping', (req, res, next) => {
        return res.sendStatus(204);
    });

    router.use('/chat', chatRouter);

    router.use('/', errorHandler);

    return router;
};
