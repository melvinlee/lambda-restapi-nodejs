const databaseAccess = require("../databaseAccess")
const response = require("../response");
const validator = require("../validator");

module.exports.handler = async (event, context, callback) => {

    console.log(`Request: ${JSON.stringify(event, null, 2)}`);

    const data = JSON.parse(event.body);

    if(!validator.validate(data)){
        console.log("Validation Failed");
        callback(null, resnpose.buildResponse(400, "Couldn't update the book item."));
        return;
      }

    if (typeof data.title !== 'string' || typeof data.author !== 'string' || typeof data.read !== 'boolean') {
        console.log('Validation Failed');
        callback(null, resnpose.buildResponse(400, "Couldn't update the book item."));
        return;
    }

    try{
        let result = await databaseAccess.editBook(event.pathParameters.id, data);
        callback(null, response.buildResponse(200, result));
    }catch(err){
        callback(null, response.buildResponse(501, { message: "Couldn't update the book item.", error: err }));
    }

}