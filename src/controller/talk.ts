import { join } from '@prisma/client/runtime';

import { talkValidation, options } from './../modules/Validation';
import prisma from "../db";


export const createTalk = async (req, res) => {
    try {
        const validTalk = await talkValidation.validate(req.body, options)
        if (validTalk.error) {
            return res.status(400).json({
                Error: validTalk.error.details[0].message,
            });
        }
        const talk = await prisma.talk.create({
            data: {
                title: req.body.title,
                location: req.body.location,
                date: new Date(req.body.date),
                describtion: req.body.describtion,

            }
        })
        return res.status(200).json(talk);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Failed to create a talk !" });
    }
}


//Getting all the tralk in the database
export const getAllTalks = async (req, res) => {
    try {
        const talks = await prisma.talk.findMany();
        return res.status(200).json(talks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get all talks" });
    }
}

//Update a talk if there is need to make changes
export const updateTalk = async (req, res) => {
    try {
        const updatedTalk = await prisma.talk.update({
            where: {
                id: req.params.id
            },
            data: {
                title: req.body.title,
                location: req.body.location,
                date: new Date(req.body.date),
                describtion: req.body.describtion,

            }
        })
        return res.status(200).json(updatedTalk);
    } catch (error) {
        return res.status(500).join("Failed to update talk!");
    }
}

//Getting one talk by its id
export const getOneTalkById = async (req, res) => {
    try {
        const talk = await prisma.talk.findUnique({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(talk);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Roming a Talk
export const RemoveTalk = async (req, res) => {
    try {
        const deleted = await prisma.talk.delete({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(deleted);

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Failed to remove a talk !" });
    }
}
