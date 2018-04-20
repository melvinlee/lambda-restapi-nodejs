const databaseAccess = require("../databaseAccess")
const response = require("../response");

module.exports.handler = async (event, context, callback) => {
    console.log(`Request: ${JSON.stringify(event, null, 2)}`);

    try{
        await databaseAccess.deleteBook(event.pathParameters.id);
        callback(null, response.buildResponse(204));
    }catch(err){
        callback(null, response.buildResponse(501, { message: "Couldn't delete the book item.", error: err }));
    }
  };
  