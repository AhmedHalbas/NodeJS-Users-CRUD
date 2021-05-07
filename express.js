// TODO: Move constants to .env file.
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const initMongoose = require('./initMongoose');
const apiRouter = require('./routers/api');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const port = process.env.PORT | 3000;
const app = express();

app.use(express.json());
app.use(cors('*'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.use(errorHandler);

initMongoose().then(() => {
  app.listen(port, () => {
    console.log(`started listening on port ${port}`);
  });
});
