var crypto = require("crypto");
var https = require('https');

var dps_uri = "";
var keyname = "";
var key = "";
var registration_id = ""

var generateSasToken = function(resourceUri, signingKey, policyName, expiresInMins) {
    resourceUri = encodeURIComponent(resourceUri);

    // Set expiration in seconds
    var expires = (Date.now() / 1000) + expiresInMins * 60;
    expires = Math.ceil(expires);
    var toSign = resourceUri + '\n' + expires;

    // Use crypto
    var hmac = crypto.createHmac('sha256', new Buffer(signingKey, 'base64'));
    hmac.update(toSign);
    var base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

    // Construct authorization string
    var token = "SharedAccessSignature sr=" + resourceUri + "&sig="
    + base64UriEncoded + "&se=" + expires + "&skn="+ policyName;
    return token;
};

var sas = generateSasToken(dps_uri, key, keyname, 3600);

var options = {
    host: dps_uri,
    port: 443,
    path: `/enrollments/${registration_id}?api-version=2019-03-31`,
    method: "GET",
    headers: { 'Authorization': sas }
};

var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.log("body: ", JSON.parse(d));
    });
});

req.end();

