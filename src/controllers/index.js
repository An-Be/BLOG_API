const express = require('express');
const debug = require('debug')('app:controllers');
const { db } = require('../db');
const { Blog, User, Comment } = require('../models/index');
const { use } = require('../routes');

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
/**
 * @desc Get all comments
 * @route GET api/comments
 * @access Public
 */

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
/**
 * @desc Get Blog by Id
 * @route GET api/blogs/:id
 * @access Public
 */

exports.getBlogById = async (req, res) => {
    const blogId = req.params.id;

    try{
        const findBlogById = await Blog.findByPk(blogId);
        res.status(200).json({
            findBlogById,
            success: true,
            message: 'Blog returned!'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Blog not returned - Error: ${error}`
        });
    }
}

/**
 * @desc Get User by Id
 * @route GET api/users/:id
 * @access Public
 */
exports.getUsersById = async (req, res) =>{
    const userId = req.params.id;

    try{
        const findUserById = await User.findByPk(userId);
        res.status(200).json({
            findUserById,
            success: true,
            message: 'User returned!'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `User not returned - Error: ${error}`
        });
    }
}

/**
 * @desc Get comment by Id
 * @route GET api/comments/:id
 * @access Public
 */
exports.getCommentsById = async (req, res) => {
    const commentId = req.params.id;

    try{
        const findCommentById = await Comment.findByPk(commentId);
        res.status(200).json({
            findCommentById,
            success: true,
            message: 'Comment returned!'
        })
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Comment not returned - Error: ${error}`
        });
    }
}
/**
 * @desc GET All Blogs written by a user
 * @route GET api/user/blogs-written/:userid
 * @access Public
 */
exports.getUsersBlogs = async (req, res) => {
    const paramsUserId = req.params.userid;

    try{
        const findBlogsMatchingUserId = await Blog.findAll({
            where : {
                UserId : paramsUserId
            }
        })
        res.status(200).json({
            findBlogsMatchingUserId,
            success: true,
            message: `Blogs by user ${paramsUserId} returned`
        })     
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Blogs by user ${paramsUserId} not returned - Error: ${error}`
        });
    }
}
/**
 * @desc GET user that wrote a blog
 * @route GET api/blog/find-user/:id
 * @access Public
 */
 exports.getBlogsUser = async (req, res) => {
    const blogId = req.params.id;

    try{
        const findBlog = await Blog.findByPk(blogId);
        const userid = findBlog.dataValues.UserId;
        const findUser = await User.findByPk(userid);

        res.status(200).json({
            findUser,
            success: true,
            message: `user found`
        })     
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `User could not be located - Error: ${error}`
        });
    }
}
/**
 * @desc GET all comments written by user
 * @route GET api/user/comments/:userid
 * @access Private
 */
exports.getUsersComments = async (req, res) => {
    const paramsUserId = req.params.userid;

    try{
        const findUsersComments = await Comment.findAll({
            where : {
                UserId : paramsUserId
            }
        })
        res.status(200).json({
            findUsersComments,
            success: true,
            message: `Comments by user ${paramsUserId} returned`
        }) 


    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Comments by user ${paramsUserId} not returned - Error: ${error}`
        });
    }
}
/**
 * @desc GET all comments under a blog
 * @route GET api/blog/find-comments/:blogid
 * @access Private
 */
exports.getBlogsComments = async (req, res) => {
    const paramsBlogId = req.params.blogid;

    try{
        const findAllCommentsUnderBlog = await Comment.findAll({
            where : {
                BlogId : paramsBlogId
            }
        })
        res.status(200).json({
            findAllCommentsUnderBlog,
            success: true,
            message: `Comments under blog ${paramsBlogId} returned`
        }) 

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Comments under Blog ${paramsBlogId} not returned - Error: ${error}`
        });
    }
}

/**
 * @desc Delete blog
 * @route Delete api/blogs/delete/:id
 * @access Private
 */
exports.deleteBlog = async (req, res) =>{
    const blogId = req.params.id;

    try{
        const blogToDelete = await Blog.findByPk(blogId);
        const deletedBlog = await blogToDelete.destroy();
        res.status(200).json({
            deletedBlog,
            success: true,
            message: 'Blog deleted'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Blog not deleted - Error: ${error}`
        });
    }
}
/**
 * @desc Delete User
 * @route Delete api/users/delete/:id
 * @access Private
 */
 exports.deleteUser = async (req, res) =>{
    const userId = req.params.id;

    try{
        const userToDelete = await User.findByPk(userId);
        const deletedUser = await userToDelete.destroy();
        res.status(200).json({
            deletedUser,
            success: true,
            message: 'User deleted'
        })
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `User not deleted - Error: ${error}`
        });
    }
}
/**
 * @desc Delete comment
 * @route Delete api/comments/delete/:id
 * @access Private
 */
 exports.deleteComment = async (req, res) =>{
    const commentId = req.params.id;

    try{
        const commentToDelete = await Comment.findByPk(commentId);
        const deletedComment = await commentToDelete.destroy();
        res.status(200).json({
            deletedComment,
            success: true,
            message: 'Comment deleted'
        })
    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: `Comment not deleted - Error: ${error}`
        });
    }
}
/**
 * @desc UPDATE Blog
 * @route Delete api/update/blog/:id
 * @access Private
 */
exports.updateBlog = async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;

    try{
        const blogToUpdate = await Blog.findByPk(id);
        const updatedBlog = await blogToUpdate.update(updateBody);
        res.status(200).json({
            updatedBlog,
            success: true,
            message: 'Blog updated'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'Blog not updated'
        })
    }
}
/**
 * @desc UPDATE Comment
 * @route PUT api/update/comment/:id
 * @access Private
 */
 exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;

    try{
        const commentToUpdate = await Comment.findByPk(id);
        const updatedComment = await commentToUpdate.update(updateBody);
        res.status(200).json({
            updatedComment,
            success: true,
            message: 'Comment updated'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'Comment not updated'
        })
    }
}
/**
 * @desc UPDATE user
 * @route PUT api/update/user/:id
 * @access Private
 */
 exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;

    try{
        const userToUpdate = await User.findByPk(id);
        const updatedUser = await userToUpdate.update(updateBody);
        res.status(200).json({
            updatedUser,
            success: true,
            message: 'User updated'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'User not updated'
        })
    }
}
/**
 * @desc CREATE blog
 * @route POST api/create/blog
 * @access Private
 */
exports.createBlog = async (req, res) =>{
    const createBody = req.body;

    try{
        const newBlog = await Blog.create(createBody);
        res.status(200).json({
            newBlog,
            success: true,
            message: 'New Blog Created'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'Blog not created'
        })
    }
}
/**
 * @desc CREATE comment
 * @route POST api/create/user
 * @access Private
 */
 exports.createUser = async (req, res) =>{
    const createBody = req.body;

    try{
        const newUser = await User.create(createBody);
        res.status(200).json({
            newUser,
            success: true,
            message: 'New User Created'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'User not created'
        })
    }
}
/**
 * @desc CREATE user
 * @route POST api/create/comment
 * @access Private
 */
 exports.createComment = async (req, res) =>{
    const createBody = req.body;

    try{
        const newComment = await Comment.create(createBody);
        res.status(200).json({
            newComment,
            success: true,
            message: 'New Comment Created'
        })

    }catch(error){
        debug(error);
        res.status(400).json({
            success: false,
            message: 'Comment not created'
        })
    }
}