'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteBook = async (event, context, callback) => {
    console.log(`Request: ${JSON.stringify(event, null, 2)}`);
  
    let statusCode;
    let body;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
      }

    try{
        await dynamoDb.delete(params).promise();
        statusCode = 204;
    }catch(err){
        statusCode = 501;
        body = { message: "Couldn't delete the book item.", error: err };
    }
    finally{
        const response = {
            statusCode: statusCode,
            body: JSON.stringify(body)
          };
          callback(null, response);
    }
  };
  