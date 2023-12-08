const express = require('express');
const cors = require("cors");
const ViteExpress = require('vite-express');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDb');
  });

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errors());

app.use("/*", (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errorHandler);

ViteExpress.listen(app, process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
