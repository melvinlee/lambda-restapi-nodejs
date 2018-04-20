const databaseAccess = require("../databaseAccess");
const response = require("../response");

module.exports.handler = async (event, context, callback) => {
  console.log(`Request: ${JSON.stringify(event, null, 2)}`);

  try {
    let result = await databaseAccess.getAllBooks();
    callback(null, response.buildResponse(200, result.Items));
  } catch (error) {
    callback(null, response.buildResponse(501, { message: "Couldn't fetch books item.", error: err }));
  }
};
