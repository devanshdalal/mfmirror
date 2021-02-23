import AWS from "aws-sdk";
import lscache from "lscache";
import AES from "crypto-js/aes";
import UTF8 from 'crypto-js/enc-utf8'

const region = process.env.REACT_APP_REGION;
const accessKeyId = AES.decrypt(process.env.REACT_APP_ACCESSKEYID, process.env.REACT_APP_TOKEN).toString(UTF8);
const secretAccessKey = AES.decrypt(process.env.REACT_APP_SECRETACCESSKEY, process.env.REACT_APP_TOKEN).toString(UTF8);

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey
});

const LSCACHE_TIMEOUT = 1; // minutes

let dynamoClient = new AWS.DynamoDB.DocumentClient();

const dbClient = async (options) => {
  // console.log("dbClient.options", options);
  const { table, cache, method } = options;
  let params = {
    TableName: table,
    Item: {},
    Key: {},
  };
  return new Promise(async (resolve, reject) => {
    if (method === "SCAN") {
      if (cache) {
        const response = lscache.get(table);
        if (response) {
          return resolve(response);
        }
      }
      try {
        const response = await dynamoClient.scan(params).promise();
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
          return resolve(data);
        }
      });
    } else if (method == "DELETE") {
      params.Key = {
        name: options.name,
      };
      dynamoClient.delete(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    }
  });
  return null;
};

export default dbClient;
