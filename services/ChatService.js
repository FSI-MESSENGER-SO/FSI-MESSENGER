const express = require('express');

//Chat Endpoint
const routerChat = express.Router();
const Chat = require("../models/ChatEntity");

//Mongoose
const mongoose = require('mongoose');


routerChat.get('/', async(req,res) => {
    try{
        const chat = await Chat.find({});
        res.status(200).json(chat);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerChat.get('/:id', async(req,res) => {
    try{
        const chat = await Chat.findById(req.params.id);
        if(!chat){
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json(chat);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerChat.post('/', async(req,res) => {
    try{
        const chat =new Chat(req.body);
        await chat.save();
        res.status(201).json(chat);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerChat.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!chat){
            return res.status(404).json({message: `cannot find any chat with the ID ${id}`})
        }
        res.status(200).json(chat);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerChat.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const chat = await Chat.findByIdAndDelete(id);
        if(!chat){
            return res.status(404).json({message: `cannot find any chat with the ID ${id}`})
        }
        res.status(200).json({ message: "Chat deleted successfully", chat });
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = routerChat;