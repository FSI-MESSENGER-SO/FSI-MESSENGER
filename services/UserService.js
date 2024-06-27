const express = require('express');

//User Endpoint
const routerUser = express.Router();
const User = require('../models/UserEntity');

//Mongoose
const mongoose = require('mongoose');


routerUser.get('/', async(req,res) => {
    try{
        const user = await User.find({});
        res.status(200).json(user);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerUser.get('/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerUser.post('/', async(req,res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerUser.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!user){
            return res.status(404).json({message: `cannot find any user with the ID ${id}`})
        }
        res.status(200).json(user);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerUser.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with the ID ${id}`})
        }
        res.status(200).json({ message: "User deleted successfully", user });

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = routerUser;