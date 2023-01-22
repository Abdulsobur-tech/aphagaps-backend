import prisma from "../db";

// const createConference = async (req, res) => {
//     try {
//         const conference = await prisma.conference.create({
//             data: {
//                 attendeeId: attendee,
//                 talkId: talk,
//             },
//             select: {
//                 attendee: true,
//                 talk: true,
//             },
//         });

//     } catch (error) {
//         return res.status(400).json({ "message": "Failed to register a conference !" })
//     }
// }