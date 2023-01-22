"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.removeAttendee = exports.updateAttendee = exports.getAllAttendees = exports.createAttendee = void 0;
var auth_1 = require("./../modules/auth");
var Validation_1 = require("../modules/Validation");
var db_1 = __importDefault(require("../db"));
//Creating attendees
var createAttendee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ValidateUser, duplicatEmail, attendee, _a, _b, token, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                ValidateUser = Validation_1.attandeeValidation.validate(req.body, Validation_1.options);
                if (ValidateUser.error) {
                    return [2 /*return*/, res.status(400).json({
                            Error: ValidateUser.error.details[0].message
                        })];
                }
                return [4 /*yield*/, db_1["default"].attendee.findUnique({
                        where: { email: req.body.email }
                    })];
            case 1:
                duplicatEmail = _e.sent();
                if (duplicatEmail) {
                    return [2 /*return*/, res.status(400).json({
                            Error: "Email is used, please enter another email"
                        })];
                }
                _b = (_a = db_1["default"].attendee).create;
                _c = {};
                _d = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email
                };
                return [4 /*yield*/, (0, auth_1.hashPassword)(req.body.password)];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                        _d),
                        _c)])];
            case 3:
                attendee = _e.sent();
                token = (0, auth_1.createJWT)(attendee);
                return [2 /*return*/, res.json({ token: token })];
            case 4:
                error_1 = _e.sent();
                console.log(error_1);
                res.status(500).json({ message: "Failed to registere !" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createAttendee = createAttendee;
//Getting all attendees below
var getAllAttendees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var attendees, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].attendee.findMany()];
            case 1:
                attendees = _a.sent();
                return [2 /*return*/, res.status(200).json(attendees)];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Failed to get all Attendees" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAttendees = getAllAttendees;
//Updating attendee
var updateAttendee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ValidateUser, duplicatEmail, updatedAttendee, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                ValidateUser = Validation_1.updateAttandeeValidation.validate(req.body, Validation_1.options);
                if (ValidateUser.error) {
                    return [2 /*return*/, res.status(400).json({
                            Error: ValidateUser.error.details[0].message
                        })];
                }
                return [4 /*yield*/, db_1["default"].attendee.findUnique({
                        where: { email: req.body.email }
                    })];
            case 1:
                duplicatEmail = _a.sent();
                if (duplicatEmail) {
                    return [2 /*return*/, res.status(400).json({
                            Error: "Email is used, please enter another email"
                        })];
                }
                return [4 /*yield*/, db_1["default"].attendee.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            phone: req.body.phone,
                            email: req.body.email
                        }
                    })];
            case 2:
                updatedAttendee = _a.sent();
                return [2 /*return*/, res.status(200).json(updatedAttendee)];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json(error_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAttendee = updateAttendee;
var removeAttendee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var removedAttendee, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].attendee["delete"]({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                removedAttendee = _a.sent();
                return [2 /*return*/, res.status(200).json(removedAttendee)];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json("Failed to remove attendee!")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeAttendee = removeAttendee;
//# sourceMappingURL=attendee.js.map