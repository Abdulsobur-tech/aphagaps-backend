"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.options = exports.talkValidation = exports.updateAttandeeValidation = exports.attandeeValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.attandeeValidation = joi_1["default"].object({
    firstname: joi_1["default"].string().trim().required(),
    lastname: joi_1["default"].string().trim().required(),
    email: joi_1["default"].string().email().lowercase().required(),
    phone: joi_1["default"].string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1["default"].string().required(),
    confirmpassword: joi_1["default"].ref('password')
})["with"]('password', 'confirmpassword');
exports.updateAttandeeValidation = joi_1["default"].object({
    firstname: joi_1["default"].string().trim().required(),
    lastname: joi_1["default"].string().trim().required(),
    email: joi_1["default"].string().email().lowercase().required(),
    phone: joi_1["default"].string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required()
});
exports.talkValidation = joi_1["default"].object({
    title: joi_1["default"].string().trim().required(),
    location: joi_1["default"].string().trim().required(),
    date: joi_1["default"].date().required(),
    describtion: joi_1["default"].string().trim().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
//# sourceMappingURL=Validation.js.map