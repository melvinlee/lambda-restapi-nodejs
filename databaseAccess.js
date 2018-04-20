const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getAllBooks = () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };

  return dynamoDb.scan(params).promise();
};

module.exports.getBookById = id => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: id
    }
  };

  return dynamoDb.get(params).promise();
};

module.exports.createBook = (items) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: items
  };

  return dynamoDb.put(params).promise()
}

module.exports.deleteBook = (id) => {
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: id,
    },
  }

  return dynamoDb.delete(params).promise();
}