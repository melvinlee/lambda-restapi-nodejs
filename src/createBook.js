"use-strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createBook = async (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  let error = [];
  let statusCode;
  let body;

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (data === undefined || data === null || data === "") {
    console.log("data is missing");
    error.push({ body: "data is missing" });
  } else {
    if (data.title === undefined || data.title === null || data.title === "") {
      console.log("title is null or empty");
      error.push({ title: "title is null or empty" });
    }

    if (
      data.author === undefined ||
      data.author === null ||
      data.author == ""
    ) {
      console.log("author is null or empty");
      error.push({ author: "author is null or empty" });
    }
  }

  if (error.length > 0) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        error: error
      })
    };

    callback(null, response);
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      title: data.title,
      author: data.author,
      read: (data.read || false) == "true",
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  try {
    await dynamoDb.put(params).promise();
    statusCode = 200;
    body = params.Item;
  } catch (err) {
    statusCode = 501;
    body = { message: "Couldn't create the book item.", error: err };
  } finally {
    const response = {
      statusCode: statusCode,
      body: JSON.stringify(body)
    };

    callback(null, response);
  }
};
