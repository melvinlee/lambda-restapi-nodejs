const databaseAccess = require("../databaseAccess")
const response = require("../response");
const validator = require("../validator");
const uuid = require("uuid");

module.exports.handler = async (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  let error = [];
  const data = JSON.parse(event.body);

  if(!validator.validate(data)){
    console.log("data is missing");
    error.push({ title: "title is null or empty" });
    error.push({ author: "author is null or empty" });
    callback(null, response.buildResponse(400, {error: error}));
    return;
  }

  const {title, author } = data;

  if(!validator.validate(title)){
    console.log("title is null or empty");
    error.push({ title: "title is null or empty" });
  }

  if (!validator.validate(author)) {
    console.log("author is null or empty");
    error.push({ author: "author is null or empty" });
  }

  if (error.length > 0) {
    callback(null, response.buildResponse(400, {error: error}));
    return;
  }

  try {

    const timestamp = new Date().getTime();
  
    const item = {
        id: uuid.v1(),
        title: title,
        author: author,
        read: false,
        createdAt: timestamp,
        updatedAt: timestamp
      };

    await databaseAccess.createBook(item);
    callback(null, response.buildResponse(200, item));
  } catch (err) {
    console.log(err);
    callback(null, response.buildResponse(501,{ message: "Couldn't create the book item.", error: err }));
  } 
};