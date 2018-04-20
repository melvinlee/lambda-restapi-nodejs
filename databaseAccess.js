const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

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

module.exports.createBook = (title, author) => {

  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
        id: uuid.v1(),
        title: title,
        author: author,
        read: false,
        createdAt: timestamp,
        updatedAt: timestamp
    }
  };

  return dynamoDb.put(params).promise().then(() => params.Item)
}

module.exports.editBook = (id, data) => {

  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key:{
        id: id
    },
      UpdateExpression: "set title = :title, author = :author, #book_read = :read, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        '#book_read': 'read',
      },
      ExpressionAttributeValues:{
        ':title': data.title,
        ':author': data.author,
        ':read': data.read,
        ':updatedAt': timestamp,
      },
      ReturnValues:"UPDATED_NEW"
  };
  
  return dynamoDb.update(params).promise();
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