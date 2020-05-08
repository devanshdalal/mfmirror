import axios from "axios";
import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: "AKIA2VLYX2H6I53B4EDP",
  // secretAccessKey default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: "iD0jA7B6wIB9Fpmz16Rf0PHda+uRWzGDJLAq2XnW",
});

let docClient = new AWS.DynamoDB.DocumentClient();

let params = {
  TableName: "funds",
};

const callWebService = (options) => {
  docClient.scan(params, function (err, data) {
    console.log("data", data, "err", err);
  });
  return null;
};

export const WebServiceRequest = {
  callWebService,
};
