"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//import * as dotenv from "dotenv"
////dotenv.config()
var server_1 = __importDefault(require("./server"));
var port = process.env.PORT || 5001;
server_1["default"].listen(port, function () {
    console.log("Hello app listening on http://localhost:5001");
});
//# sourceMappingURL=index.js.map