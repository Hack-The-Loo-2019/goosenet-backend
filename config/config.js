const config = {
    server: {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.DEV_APP_PORT) || 5000,
        endpoint: process.env.ENDPOINT || '/api/v1',
        auth_header: 'x-wauth',
    },
};

module.exports = config;
