
module.exports.validate = (data) => {
    if (data === undefined || data === null || data === "")
       return false;
    return true;
}