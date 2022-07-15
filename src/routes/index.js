const express = require('express');
const debug = require('debug')('app:routes');
const { db } = require('../db');
const { Blog, User, Comment } = require('../models/index');


const router = express.Router();

//importing router logic from controller

const {
    getAllBlogs,
    getAllUsers,
    getAllComments,
    getBlogById,
    getUsersById,
    getCommentsById,
    deleteBlog,
    deleteUser,
    deleteComment

} = require('../controllers/index');

//routers
router.get('*/blogs', getAllBlogs); //route to get all blogs
router.get('*/users', getAllUsers); //route to get all users
router.get('*/comments', getAllComments); //route to get all comments
router.get('*/blogs/:id', getBlogById); //route to get blog by Id
router.get('*/users/:id', getUsersById); //route to get user by Id
router.get('*/comments/:id', getCommentsById); //route to get comment by Id
router.delete('*/blogs/delete/:id', deleteBlog); //route to delete blog
router.delete('*/users/delete/:id', deleteUser); //route to delete blog
router.delete('*/comments/delete/:id', deleteComment); //route to delete blog

 
module.exports = router;