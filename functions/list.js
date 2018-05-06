const databaseAccess = require("../databaseAccess");
const response = require("../response");

module.exports.handler = async (event, context, callback) => {

  try {
    let result = await databaseAccess.getAllBooks();
    callback(null, response.buildResponse(200, result.Items));
  } catch (err) {
    callback(null, response.buildResponse(501, { message: "Couldn't fetch books item.", error: err }));
  }
};
