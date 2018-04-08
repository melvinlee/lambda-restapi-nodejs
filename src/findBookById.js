'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.findBookById = async (event, context, callback) => {
    console.log(`Request: ${JSON.stringify(event, null, 2)}`);
  
    let statusCode;
    let body;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
          }
    }

    try {
        let result = await dynamoDb.get(params).promise();

        console.log(result.Item);
        if(result.Item === undefined || result.Item === null){
            statusCode = 204;    
        }else{
            statusCode = 200;
            body = result.Item;
        }
        
    } catch (err) {
        statusCode = 501;
        body= { message: 'Couldn\'t fetch the book item.', error: err};
    }
    const response = {
      statusCode: statusCode,
      body: JSON.stringify(body)
    };
  
    callback(null, response);
  };