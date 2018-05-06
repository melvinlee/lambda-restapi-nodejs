const databaseAccess = require("../databaseAccess")
const response = require("../response");

module.exports.handler = async (event, context, callback) => {
    
    try {
        let result = await databaseAccess.getBookById(event.pathParameters.id);
        if(result.Item === undefined || result.Item === null){  
            callback(null, response.buildResponse(204));
        }else{
            callback(null, response.buildResponse(200, result.Item));
        }
    } catch (err) {
        callback(null, response.buildResponse(501,{ message: 'Couldn\'t fetch the book item.', error: err}));
    }
  };