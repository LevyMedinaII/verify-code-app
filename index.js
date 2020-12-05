

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./api/routes');

dotenv.config();

const port = process.env.APP_PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use('/api/verify', routes.verify);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(express.static('build'));

    app.get('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.use(compression());
}

app.listen(port, () => console.log(`App initialized on port ${port}`));
