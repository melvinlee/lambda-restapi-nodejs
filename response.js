module.exports.buildResponse = (statusCode, body) => {
  return (reponse = {
    statusCode: statusCode,
    body: JSON.stringify(body)
  });
};
