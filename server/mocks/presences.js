module.exports = function(app) {
  var express = require('express');
  var presencesRouter = express.Router();
  presencesRouter.get('/', function(req, res) {
    res.send({"presences":[]});
  });
  app.use('/api/presences', presencesRouter);
};
