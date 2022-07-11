const express = require('express');
const debug = require('debug')('app:routes');
const { db } = require('../db');
const { Blog, User, Comment } = require('../models/index');


const router = express.Router();

//importing router logic from controller

const {
    getAllBlogs,
    getAllUsers,
    getAllComments

} = require('../controllers/index');

//routers
router.get('*/blogs', getAllBlogs); //route to get all blogs
router.get('*/users', getAllUsers); //route to get all users
router.get('*/comments', getAllComments); //route to get all comments

module.exports = router;