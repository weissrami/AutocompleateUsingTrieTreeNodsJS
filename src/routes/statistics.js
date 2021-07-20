var { getDictLength } = require("../service/dictionary");

const statisticsRoutes = function ({ app, getGlobalStat }) {
  const getStatistics = getGlobalStat;

  app.get("/statistics", (req, res) => {
    getStatistics((stats) => {
      res.send({
        averageRequestHandleTimeMs:
          Math.round(
            (stats.totalRequestHandleTimeMs / stats.requestHandledCount) * 100
          ) / 100,
        requestHandledCount: stats.requestHandledCount,
        wordCound: getDictLength()
      });
    });
  });
};

module.exports = { statisticsRoutes };
