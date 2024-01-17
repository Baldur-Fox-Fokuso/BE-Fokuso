"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function authentication({ req }) {
    let token = req.headers.authorization;
    console.log(token, "di auth");
    return token;
}
exports.default = authentication;
