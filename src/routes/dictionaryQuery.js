var { findWordsByPrefix } = require("../service/dictionary");

const dictionaryQueryRoutes = function ({ app, recordPerformance }) {
  app.get("/dictionary", (req, res, next) => {
    recordPerformance(() => {
      const prefix = req.query.prefix;
      const limit = req.query.limit;
      try {
        const matches = findWordsByPrefix(prefix, limit);
        res.send(matches);
      } catch (e) {
        next(e);
        return;
      }
    });
  });
};

module.exports = { dictionaryQueryRoutes };
