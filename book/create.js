const databaseAccess = require("../databaseAccess")
const response = require("../response");
const validator = require("../validator");

module.exports.handler = async (event, context, callback) => {
 
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

  try{
    let result = await databaseAccess.createBook(title, author);
    callback(null, response.buildResponse(200, result));
  } catch (error) {
    console.log(error);
    callback(null, response.buildResponse(501,{ "message": "Couldn't create the book item.", "error": error }));
  } 
};