 # Serverless REST API

This example demonstrates how to setup a RESTful Web Services allowing you to create, list, get, update and delete book item. DynamoDB is used to store the data.

## The Architecture

![Big picture](/img/serverless-arc.png?raw=true)

AWS Services Involved In This Architecture
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)

## Use-Cases

- API for Web Application
- API for Mobile Application

## Quickstart

```bash
$ npm install
```

To deploy endpoint, simple run:

```bash
$ serverless deploy
```

and the expected output:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (6.26 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
......................................
Serverless: Stack update finished...
Service Information
service: book-catalog-dynamodb-restapi
stage: dev
region: ap-southeast-1
stack: book-catalog-dynamodb-restapi-dev
api keys:
None
endpoints:
GET - https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/books
GET - https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/books/{id}
POST - https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/book
PUT - https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/books/{id}
DELETE - https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/books/{id}
functions:
getAllBooks-Get: book-catalog-dynamodb-restapi-dev-getAllBooks-Get
findBookById-Get: book-catalog-dynamodb-restapi-dev-findBookById-Get
createBook-Post: book-catalog-dynamodb-restapi-dev-createBook-Post
editBook-Put: book-catalog-dynamodb-restapi-dev-editBook-Put
deleteBook-Delete: book-catalog-dynamodb-restapi-dev-deleteBook-Delete
```

## Usage

You can create, retrieve, update or delete book item using following endpoint:

- GET /books - Get list all boooks
- GET /books/{id} - Get a book by specify bookid
- POST /book - To create new book item
- PUT /{id} - Update book item by speficy bookid
- DELETE /books/{id} - Remove book from the list

### Example 

To list all book:

```bash
$ curl https://h75ma6fhmi.execute-api.ap-southeast-1.amazonaws.com/dev/books
```

Expected result:

```bash
[
    {
        "author": "Eric Elliott",
        "createdAt": 1523175392347,
        "id": "256b62b0-3b05-11e8-9d37-eb72a237d81e",
        "read": true,
        "title": "\nProgramming JavaScript Applications : Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
        "updatedAt": 1523175392347
    },
    {
        "author": "Lev Luthor",
        "createdAt": 1523173543421,
        "id": "d75fd1e0-3b00-11e8-a4e8-ebdd8204a242",
        "read": false,
        "title": "War and Peace",
        "updatedAt": 1523173543421
    }
]
```

## DynamoDB
When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the settings in the `serverless.yml`

```yaml
ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```
