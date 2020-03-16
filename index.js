const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const passport = require('passport');

const {
  AuthRouter,
  PrivateRouter
} = require('./routers');

require('dotenv').config();
require('./utils/database')();
require('./utils/passportConfig')(passport);

app.use('/assets', express.static(path.join(__dirname, './public/assets/')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/', AuthRouter);
app.use('/private',
  passport.authenticate('jwt', { session: false }),
  PrivateRouter
);

server.listen(process.env.PORT, () => {
  console.log(`App Running in port ${process.env.PORT}`)
});