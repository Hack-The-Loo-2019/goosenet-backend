module.exports = async (err, req, res, next) => {
    const result = {};
    let status;

    if (err.status) {
        status = err.status;
        if (err.message && err.message !== '') {
            result.error = err.message;
        } else switch (err.status) {
            case 400:
                result.error = 'BAD_REQUEST';
                break;
            case 401:
                result.error = 'UNAUTHORIZED';
                break;
            case 404:
                result.error = 'NOT_FOUND';
                break;
            case 409:
                result.error = 'CONFLICT';
                break;
            case 500:
                console.error(err.stack);
                result.error = 'SERVER_ERROR';
                break;
            default:
                result.error = '';
        }
    } else {
        console.error(err.stack);
        status = 500;
        result.error = 'SERVER_ERROR';
    }
    console.log(`Returned ${status} with body ${JSON.stringify(result)}`);
    res.status(status).send(result);
};
