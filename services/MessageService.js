const express = require('express');

//Message Endpoint
const routerMessage = express.Router();
const Message = require('../models/MessagesEntity');

//Mongoose
const mongoose = require('mongoose');

//Multer
const multer = require('multer');
const Post = require("../models/PostsEntity");
const upload = multer();

routerMessage.get('/', async(req,res) => {
    try{
        const message = await Message.find({});
        res.status(200).json(message);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerMessage.get('/:id', async(req,res) => {
    try{
        const messageE = await Message.findById(req.params.id);
        if (!messageE) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({
            user_id: messageE.user_id,
            sender_id: messageE.sender_id,
            message: messageE.messageSent,
            contentUrl: messageE._id
        });
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerMessage.get('/:id/content', async (req, res) => {
    try {
        const messageE = await Post.findById(req.params.id);
        if (!messageE || !messageE.content) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.set('Content-Type', messageE.content.contentType);
        res.send(messageE.content.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

routerMessage.post('/', upload.single('content'), async(req,res) => {
    try{
        const { user_id, sender_id, messageSent } = req.body;
        const message = new Message({
            user_id,
            sender_id,
            messageSent,
            content: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            } : undefined,
        });
        await message.save();
        res.status(200).json(message);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerMessage.put('/:id', upload.single('content'), async(req,res) => {
    try{
        const {id} = req.params;
        const updateData = req.body;

        if (req.file) {
            updateData.content = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            };
        }

        const message = await Message.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if(!message){
            return res.status(404).json({message: `cannot find any message with the ID ${id}`})
        }
        res.status(200).json(message);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerMessage.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const messageSent = await Message.findByIdAndDelete(id);
        if(!messageSent){
            return res.status(404).json({message: `cannot find any message with the ID ${id}`})
        }
        res.status(200).json({ message: "Message deleted successfully", messageSent });

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = routerMessage;