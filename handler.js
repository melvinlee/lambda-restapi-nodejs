"use strict";

let AWS = require("aws-sdk");
let lambda = new AWS.Lambda();

console.log("Loading...");

module.exports.findBookById = (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };

  callback(null, response);
};

module.exports.editBook = (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };

  callback(null, response);
};

module.exports.removeBook = (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  const response = {
    statusCode: 204,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };

  callback(null, response);
};
