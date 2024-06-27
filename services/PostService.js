const express = require('express');

//Post Endpoint
const routerPost = express.Router();
const Post = require('../models/PostsEntity');

//Mongoose
const mongoose = require('mongoose');

//Multer
const multer = require('multer');
const upload = multer();


routerPost.get('/', async(req,res) => {
    try{
        const post = await Post.find({});
        res.status(200).json(post);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

routerPost.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: post.message,
            contentUrl: post._id
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


routerPost.get('/:id/content', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || !post.content) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.set('Content-Type', post.content.contentType);
        res.send(post.content.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

routerPost.post('/', upload.single('content'), async (req, res) => {
    try {
        const { user_id, message } = req.body;
        const post = new Post({
            user_id,
            message,
            content: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            } : undefined,
        });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

routerPost.put('/:id', upload.single('content'), async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.file) {
            updateData.content = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: req.file.originalname
            };
        }

        const post = await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!post) {
            return res.status(404).json({ message: `Cannot find any post with the ID ${id}` });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

routerPost.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const post = await Post.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({message: `cannot find any post with the ID ${id}`})
        }
        res.status(200).json({ message: "Post deleted successfully", post });

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = routerPost;