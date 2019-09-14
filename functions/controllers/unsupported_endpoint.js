module.exports = async (req, res) => {
    console.log('Unsupported endpoint');
    res.status(404).send({error: 'UNSUPPORTED_ENDPOINT'});
};
