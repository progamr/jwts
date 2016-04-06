var crypto = require('crypto');
/**
 * will encode and return our JWT using
 * the payload and secret
 * @param payload
 * @param secret
 */
exports.encode = function (payload, secret) {
    var algorithm = 'HS256';
    // encode the json versions of our header and payload .
    var header = {type : 'JWT', alg : algorithm};
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(payload);
    // encrypt and encode the signature and append it to the jwt .
    return jwt +'.' + sign(jwt, secret);
};


/**
 * will wrap the native call and encode the all
 * the 3 parts of the JWT using base64 encoding
 * @param str
 * @returns {*}
 */
function base64Encode (str) {
    return new Buffer(str).toString('base64');
};

/**
 * will encrypt the signature using crypto against
 * the passed key and encode it
 * @param jwt
 * @param secret
 */
function sign (str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}