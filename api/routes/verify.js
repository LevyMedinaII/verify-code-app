const express = require('express');
const { validateCode } = require('../validators/verify');

const router = express.Router();

router.post('/', validateCode, (req, res, next) => {
    const { code } = req.body;
    const regex = /^[0-9]{1,6}$/;
    const isValidInput = regex.test(code);

    if (!isValidInput) {
        return res.status(422).send({
            message: 'Verification error.'
        })
    };

    return res.status(200).send('Success');
});

module.exports = router;
