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
  };
  return new Promise(async (resolve, reject) => {
    if (method === "SCAN") {
      if (cache) {
        const response = lscache.get(table);
        if (response) {
          resolve(response);
        }
      }

      try {
        const response = await dynamoClient.scan(params).promise();
        console.log("response1:", response);
        lscache.set(table, response, LSCACHE_TIMEOUT);
        resolve(response);
      } catch (err) {
        console.log("err", err);
        reject(err);
      }
    } else if (method == "PUT") {
      params.Item = options.item;
      params.ReturnConsumedCapacity = "TOTAL";
      dynamoClient.put(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log("data", data);
          resolve(data);
        }
      });
    }
  });
  return null;
};

export default dbClient;
