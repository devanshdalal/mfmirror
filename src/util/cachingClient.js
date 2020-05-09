import AWS from "aws-sdk";
import lscache from "lscache";

AWS.config.update({
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
});

const LSCACHE_TIMEOUT = 10;

let dynamoClient = new AWS.DynamoDB.DocumentClient();

const dbClient = async (options) => {
  console.log("dbClient.options", options);
  const { table, cache, method } = options;
  let params = {
    TableName: table,
    Item: {},
    Key: {},
  };
  return new Promise(async (resolve, reject) => {
    if (method === "SCAN") {
      console.log("cache enabled", cache);
      if (cache) {
        const response = lscache.get(table);
        console.log("response lscache", response);
        if (response) {
          console.log("cached response", response);
          return resolve(response);
        } else {
          console.log("response not cached");
        }
      }
      try {
        const response = await dynamoClient.scan(params).promise();
        console.log("response not cached:", response);
        lscache.set(table, response, LSCACHE_TIMEOUT);
        return resolve(response);
      } catch (err) {
        console.log("err", err);
        return reject(err);
      }
    } else if (method == "PUT") {
      params.Item = options.item;
      params.ReturnConsumedCapacity = "TOTAL";
      // params.Key = {
      //   name: options.item.name,
      // };
      dynamoClient.put(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          console.log("data", data);
          return resolve(data);
        }
      });
    } else if (method == "DELETE") {
      params.Item = options.item;
      params.ReturnConsumedCapacity = "TOTAL";
      params.Key = {
        name: options.name,
      };
      dynamoClient.delete(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          console.log("data--", data);
          return resolve(data);
        }
      });
    }
  });
  return null;
};

export default dbClient;
