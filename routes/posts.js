const express = require('express');
const router = express.Router()
const Post = require('../models/Post');
const { authenticateToken } = require('../helpers/jwt');


// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author').sort({createdAt: 'desc'});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// GET all posts by author
router.get('/author/:authorId', authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find({author: req.params.authorId}).populate('author').sort({createdAt: 'desc'});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// GET single post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.find({_id: req.params.postId}).populate('author');
        
        if(post){
            res.status(200).json(post);
        } 
        else {
            res.status(404).json({msg: 'Not Found'});
        }  
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// SEARCH posts 
router.get('/search/:keyword', async (req, res) => {
    try {
        const posts = await Post.find({
            $or: [
                {title: {$regex: req.params.keyword}},
                {summary: {$regex: req.params.keyword}},
                {content: {$regex: req.params.keyword}},
            ]
        }).populate('author');
        
        if(posts.length > 0) {        
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(404).json(error)
    }
} )

// SEARCH user's posts 
router.get('/:authorId/search/:keyword', async (req, res) => {
    try {
        const posts = await Post.find({
            $and: [
                {author: req.params.authorId},
                {$or: [
                    {title: {$regex: req.params.keyword}},
                    {summary: {$regex: req.params.keyword}},
                    {content: {$regex: req.params.keyword}},
                ]}
            ]
            
        }).populate('author');
        
        if(posts.length > 0) {        
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(404).json(error)
    }
} )

// CREATE single post
router.post('/', authenticateToken, async (req, res)=>{
    const {title, summary, content, featured, author } = req.body;
    try {
        const newPost = await Post.create({
            title: title,
            summary: summary,
            content: content,
            featured: featured, 
            author: author
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// UPDATE single post
router.put('/:id', authenticateToken, async(req, res) =>{
    const { updates } = req.body
    try {
        const updatedPost = await Post.findOneAndUpdate({_id: req.params.id}, updates, {returnOriginal: false})
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// DELETE single post
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.deleteOne({_id: req.params.id})
        res.status(200).json({deleted: post});
    } catch (error) {
        res.status(400).json(error.message);
    }
})


module.exports = router