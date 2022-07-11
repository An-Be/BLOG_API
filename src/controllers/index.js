const express = require('express');
const debug = require('debug')('app:controllers');
const { db } = require('../db');
const { Blog, User, Comment } = require('../models/index');

//GET REQUESTS

/**
 * @desc Get all blogs
 * @route GET api/blogs
 * @access Public
 */

exports.getAllBlogs = async (req, res) => {
    

    try{
        const allBlogs = await Blog.findAll();
        if(!allBlogs){
            res.status(400).json({
                success: false,
                message: `No blogs on database`
            });
        }else{
            res.status(200).json({
                allBlogs,
                success: true,
                message: `All Blogs returned!`
            });
        }
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `All Blogs not returned - Error: ${error}`
        });
    };
};

/**
 * @desc Get all users
 * @route GET api/users
 * @access Public
 */

exports.getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.findAll();
        if(!allUsers){
            res.status(400).json({
                success: false,
                message: `No users on database`
            });
        }else{
            res.status(200).json({
                allUsers,
                success: true,
                message: `All Users returned!`
            });
        }
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `All Users not returned - Error: ${error}`
        });
    };
}

exports.getAllComments = async (req, res) =>{
    try{
        const allComments = await Comment.findAll();
        if(!allComments){
            res.status(400).json({
                success: false,
                message: `No comments on database`
            });
        }else{
            res.status(200).json({
                allComments,
                success: true,
                message: `All comments returned!`
            });
        }
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `All comments not returned - Error: ${error}`
        });
    };
}