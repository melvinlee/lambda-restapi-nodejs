"use-strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.getAllBooks = async (event, context, callback) => {
    console.log(`Request: ${JSON.stringify(event, null, 2)}`);
    
    let statusCode;
    let body;

    try {
      
      let result  = await dynamoDb.scan(params).promise();
      body = result.Items;
      statusCode = 200;
    } catch (error) {
      statusCode = 501;
      body = { message: "Couldn't fetch books item.", error: err };
    } finally {
      const response = {
        statusCode: statusCode,
        body: JSON.stringify(body)
      };
      callback(null, response);
    }
  };