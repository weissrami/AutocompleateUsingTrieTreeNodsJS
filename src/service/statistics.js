const { promisify } = require("util");
const redis = require("redis");

const client = redis.createClient({
  host: "redis-13274.c1.asia-northeast1-1.gce.cloud.redislabs.com",
  port: 13274,
  password: "bonW4QDOaZdw1dOKoD96bf6399IFObre"
});

client.on("connect", () => {
  console.log("Connected to our redis instance!");
});

const initStatisticsObject = () => {
  return {
    totalRequestHandleTimeMs: 0,
    requestHandledCount: 0
  };
};

const StatKey = "prefixPerformance";
const getGlobalStat = async (callback) => {
  client.get(StatKey, (error, currentValueStr) => {
    console.log(StatKey, currentValueStr);
    const currentValue = currentValueStr
      ? JSON.parse(currentValueStr)
      : initStatisticsObject();

    callback(currentValue);
  });
};

const addGlobalStat = (requestHandleTimeMs, requestHandledCount) => {
  client.get(StatKey, (error, currentValueStr) => {
    const currentValue = currentValueStr
      ? JSON.parse(currentValueStr)
      : initStatisticsObject();
    currentValue.totalRequestHandleTimeMs =
      +currentValue.totalRequestHandleTimeMs + +requestHandleTimeMs;
    currentValue.requestHandledCount =
      +currentValue.requestHandledCount + +requestHandledCount;

    client.set(StatKey, JSON.stringify(currentValue));
  });
};

// wraper function for recording performance of operation
const recordPerformance = (action) => {
  const start = process.hrtime();
  action();
  const after = process.hrtime(start);
  const elapsed = (after[0] * 1000000000 + after[1]) / 1000000;
  setTimeout(() => addGlobalStat(elapsed, 1), 0);
};

module.exports = { getGlobalStat, recordPerformance };
