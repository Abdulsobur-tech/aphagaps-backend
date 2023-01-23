"use strict";
exports.__esModule = true;
var express_1 = require("express");
var attendee_1 = require("./controller/attendee");
var talk_1 = require("./controller/talk");
var conference_1 = require("./controller/conference");
var auth_1 = require("./modules/auth");
var router = (0, express_1.Router)();
router.post("/signup", attendee_1.createAttendee);
router.get("/attendees", attendee_1.getAllAttendees);
router.put("/update-attendee/:id", auth_1.protect, attendee_1.updateAttendee);
router["delete"]("/remove-attendee/:id", auth_1.protect, attendee_1.removeAttendee);
router.post("/addtalk", auth_1.protect, talk_1.createTalk);
router.get("/talks", talk_1.getAllTalks);
router["delete"]("/talk/:id", auth_1.protect, talk_1.RemoveTalk);
router.get("/gettalk/:id", auth_1.protect, talk_1.getOneTalkById);
router.post("/conference/:id", auth_1.protect, conference_1.conference);
exports["default"] = router;
//# sourceMappingURL=router.js.map