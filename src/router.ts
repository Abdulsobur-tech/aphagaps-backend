import { Router } from 'express';
import { createAttendee, getAllAttendees, updateAttendee, removeAttendee } from './controller/attendee';
import { createTalk, getAllTalks, RemoveTalk, getOneTalkById } from './controller/talk';
import { conference, removeUserFromConference } from './controller/conference';
import { protect } from './modules/auth';
const router = Router();
//Attendee routes
router.post("/signup", createAttendee);
router.get("/attendees", getAllAttendees);
router.put("/update-attendee/:id", protect, updateAttendee);
router.delete("/remove-attendee/:id", protect, removeAttendee)
//Talk routes
router.post("/addtalk", protect, createTalk);
router.get("/talks", getAllTalks);
router.delete("/talk/:id", protect, RemoveTalk);
router.get("/gettalk/:id", protect, getOneTalkById);

//Conference routes
router.post("/conference/:id", protect, conference);
router.delete("/removeuserfromConference", protect, removeUserFromConference);

export default router;