"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./endpoints/users"));
var products_1 = __importDefault(require("./endpoints/products"));
var orders_1 = __importDefault(require("./endpoints/orders"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.use('/', users_1["default"]);
app.use('/', products_1["default"]);
app.use('/', orders_1["default"]);
app.listen(3000);
