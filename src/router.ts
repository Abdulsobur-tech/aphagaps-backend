import { Router } from 'express';
import { createAttendee, getAllAttendees, updateAttendee, removeAttendee } from './controller/attendee';
import { createTalk, getAllTalks, RemoveTalk, getOneTalkById } from './controller/talk';
import { protect } from './modules/auth';
const router = Router();

router.post("/signup", createAttendee);
router.get("/attendees", getAllAttendees);
router.put("/update-attendee/:id", protect, updateAttendee);
router.delete("/remove-attendee/:id", protect, removeAttendee)

router.post("/addtalk", protect, createTalk);
router.get("/talks", getAllTalks);
router.delete("/talk/:id", protect, RemoveTalk);
router.get("/gettalk/:id", protect, getOneTalkById);
export default router;