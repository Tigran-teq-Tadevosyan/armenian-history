'use strict';

const main = require('../routes/main'),
      admin = require('../routes/admin');

module.exports = (app) => {
  app.use('/', main);
  app.use('/admin', admin);
};