
import { hashPassword, createJWT } from './../modules/auth';
import { attandeeValidation, options, updateAttandeeValidation } from '../modules/Validation';
import prisma from "../db";


//Creating attendees
export const createAttendee = async (req, res) => {
    try {
        const ValidateUser = attandeeValidation.validate(req.body, options);
        if (ValidateUser.error) {
            return res.status(400).json({
                Error: ValidateUser.error.details[0].message,
            });
        }
        const duplicatEmail = await prisma.attendee.findUnique({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(400).json({
                Error: "Email is used, please enter another email",
            });
        }

        const attendee = await prisma.attendee.create({
            data: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(attendee);
        return res.json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to registere !" });
    }


}

//Getting all attendees below

export const getAllAttendees = async (req, res) => {
    try {
        const attendees = await prisma.attendee.findMany(
        )
        return res.status(200).json(attendees);

    } catch (error) {
        res.status(500).json({ message: "Failed to get all Attendees" });
    }
}

//Updating attendee
export const updateAttendee = async (req, res) => {
    try {
        const ValidateUser = updateAttandeeValidation.validate(req.body, options);
        if (ValidateUser.error) {
            return res.status(400).json({
                Error: ValidateUser.error.details[0].message,
            });
        }
        const duplicatEmail = await prisma.attendee.findUnique({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(400).json({
                Error: "Email is used, please enter another email",
            });
        }
        const updatedAttendee = await prisma.attendee.update({
            where: {
                id: req.params.id
            },
            data: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
            }
        })
        return res.status(200).json(updatedAttendee);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const removeAttendee = async (req, res) => {
    try {
        const removedAttendee = await prisma.attendee.delete({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(removedAttendee);
    } catch (error) {
        return res.status(500).json("Failed to remove attendee!");
    }
}
