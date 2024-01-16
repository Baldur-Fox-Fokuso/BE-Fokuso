"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const createToken = (payload) => jsonwebtoken_1.default.sign(payload, secret);
exports.createToken = createToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, secret);
exports.verifyToken = verifyToken;
