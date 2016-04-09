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
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    // encrypt and encode the signature and append it to the jwt .
    return jwt +'.' + sign(jwt, secret);
};


exports.decode = function (token, key) {
    var segments = token.split('.');
    if(segments.length !== 3)
        throw new Error('token structure incorrect');
    var header = JSON.parse(base64Decode(segments[0]));
    var paylaod = JSON.parse(base64Decode(segments[1]));

    // verifying the  signature
    var rowSignature = segments[0] + '.' + segments[1];
    if(!verify(rowSignature, key, segments[2]))
        throw new Error('verification failed');
    return paylaod;
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
 * will decode given string using a base64 decode
 * @param str
 * @returns {*}
 */
function base64Decode (str) {
    return new Buffer(str, 'base64').toString();
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

/**
 * compare the row signature (header.payload) to
 * the current passed signature within the token
 * @param row
 * @param secret
 * @param signature
 * @returns {boolean}
 */
function verify(row, secret, signature) {
    return signature === sign(row, secret)
};