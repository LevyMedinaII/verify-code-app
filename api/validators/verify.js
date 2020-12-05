const { INVALID_CODE } = require('../errors/verify');

const validateCode = (req, res, next) => {
    const { code } = req.body;

    const regex = /^[0-9]{1,6}$/;
    const isValidInput = regex.test(code);

    if (!isValidInput) {
        res.status(422).send({
            type: INVALID_CODE,
        });
    }

    next();
};

module.exports = {
    validateCode,
};
