const express = require('express');

//Contact Endpoint
const routerContact = express.Router();
const Contact = require('../models/ContactEntity');

//Mongoose
const mongoose = require('mongoose');


routerContact.get('/', async(req,res) => {
    try{
        const contact = await Contact.find({});
        res.status(200).json(contact);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerContact.get('/:id', async(req,res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerContact.post('/', async(req,res) => {
    try{
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerContact.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!contact){
            return res.status(404).json({message: `cannot find any contact with the ID ${id}`})
        }
        res.status(200).json(contact);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerContact.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const contact = await Contact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({message: `cannot find any contact with the ID ${id}`})
        }
        res.status(200).json({ message: "Contact deleted successfully", contact });

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = routerContact;