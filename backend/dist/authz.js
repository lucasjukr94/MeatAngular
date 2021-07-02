"use strict";
exports.__esModule = true;
exports.handleAuthorization = void 0;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
var handleAuthorization = function (req, res, next) {
    var token = extractToken(req);
    if (!token) {
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        res.status(410).json({ message: 'Você precisa se autenticar' });
    }
    else {
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                res.status(403).json({ message: 'Não autorizado' });
            }
        });
    }
};
exports.handleAuthorization = handleAuthorization;
function extractToken(req) {
    var token;
    if (req.headers && req.headers.authorization) {
        //Authorization: Bearer ZZZ.ZZZ.ZZZ
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}