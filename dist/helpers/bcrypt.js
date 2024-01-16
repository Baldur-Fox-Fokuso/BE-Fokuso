"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.hashPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPass = (password) => bcrypt_1.default.hashSync(password, 10);
exports.hashPass = hashPass;
const comparePass = (password, hashedPass) => bcrypt_1.default.compareSync(password, hashedPass);
exports.comparePass = comparePass;
