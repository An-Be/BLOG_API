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
    deleteComment,
    getUsersBlogs,
    getBlogsUser,
    getUsersComments,
    getBlogsComments,
    updateBlog,
    updateComment,
    updateUser,
    createBlog,
    createComment,
    createUser

} = require('../controllers/index');

//routers
router.get('*/blogs', getAllBlogs); //route to get all blogs
router.get('*/users', getAllUsers); //route to get all users
router.get('*/comments', getAllComments); //route to get all comments
router.get('*/blogs/:id', getBlogById); //route to get blog by Id
router.get('*/users/:id', getUsersById); //route to get user by Id
router.get('*/comments/:id', getCommentsById); //route to get comment by Id
router.get('*/user/blogs-written/:userid', getUsersBlogs); //route to get a users blogs
router.get('*/blog/find-user/:id', getBlogsUser); //route to get who wrote the blog
router.get('*/user/comments/:userid', getUsersComments); //route to users comments
router.get('*/blog/find-comments/:blogid', getBlogsComments); //route to all blogs comments
router.delete('*/blogs/delete/:id', deleteBlog); //route to delete blog
router.delete('*/users/delete/:id', deleteUser); //route to delete blog
router.delete('*/comments/delete/:id', deleteComment); //route to delete blog
router.put('*/update/blog/:id', updateBlog); //route to update blog
router.put('*/update/comment/:id', updateComment); //route to update Comment
router.put('*/update/user/:id', updateUser); //route to update User
router.post('*/create/blog', createBlog); //route to create a blog
router.post('*/create/comment', createComment); //route to create a comment
router.post('*/create/user', createUser); //route to create a user



 
module.exports = router;