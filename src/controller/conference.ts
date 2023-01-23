import prisma from "../db";

export const conference = async (req, res) => {
    try {
        const validUser = await prisma.conference.findFirst({
            where: {
                attendeeId: req.user.id,
                talkId: req.params.id
            }
        })
        if (validUser) {
            return res.status(400).json({ data: "This user has already registered for this talk!" })
        }
        const registerAtendee = await prisma.conference.create({
            data: {
                attendeeId: req.user.id,
                talkId: req.params.id
            }
        })
        console.log(registerAtendee);

        return res.status(200).json(registerAtendee)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

export const removeUserFromConference = async (req, res) => {
    try {
        const validUser = await prisma.conference.findFirst({
            where: {
                ticketId: req.params.id
            }
        })
        if (!validUser) {
            return res.status(400).json({ data: "This User is not in this conference!" })
        }
        const removedUser = await prisma.conference.delete({
            where: {
                ticketId: req.params.id
            }
        })
        return res.status(200).json(removedUser)
    } catch (error) {
        return res.status(500).json({ data: "Failed to remove user from the conference!" })
    }
}