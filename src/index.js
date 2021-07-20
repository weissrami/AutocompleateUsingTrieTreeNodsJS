const express = require("express");
const { getGlobalStat, recordPerformance } = require("./service/statistics");
const { dictionaryQueryRoutes } = require("./routes/dictionaryQuery");
const { statisticsRoutes } = require("./routes/statistics");
const { dictionaryUpdateRoutes } = require("./routes/dictionaryUpdate");
const { welcomeRoutes } = require("./routes/welcome");

const app = express();

const dependencies = { app, getGlobalStat, recordPerformance };
dictionaryQueryRoutes(dependencies);
statisticsRoutes(dependencies);
dictionaryUpdateRoutes(dependencies);
welcomeRoutes(dependencies);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const port = 3000;

if (!module.parent) {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
}

module.exports = app;
