const path = require('path');
const fs = require('fs').promises;

//import db
//import models
const { db } = require('./src/db');
const{ Blog, User, Comment } = require('./src/models/index');

//write our seed function -> take our json file, create rows with our data into it
const seed = async () => {
    await db.sync({ force: true }); //clear out database and tables

    const blogSeedPath = path.join(__dirname, 'blogs.json'); //get path to blogs.json
    const userSeedPath = path.join(__dirname, 'users.json'); //get path to users.json
    const commentsSeedPath = path.join(__dirname, 'comments.json'); //get path to comments.json

    //asynchronously reads the content in files
    const blogBuffer = await fs.readFile(blogSeedPath); 
    const userBuffer = await fs.readFile(userSeedPath);
    const commentBuffer = await fs.readFile(commentsSeedPath);

    // First we convert the data from buffer into a string, then we parse the JSON so it converts from string -> object
    const { blogsData } = JSON.parse(String(blogBuffer));
    const { usersData } = JSON.parse(String(userBuffer));
    const { commentsData } = JSON.parse(String(commentBuffer));

    //create data and put it into DB
    const blogPromises = blogsData.map((blog) => Blog.create(blog));
    const userPromises = usersData.map((user) => User.create(user));
    const commentPromises = commentsData.map((comment) => Comment.create(comment));

    // The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.
    await Promise.all(blogPromises);
    await Promise.all(userPromises);
    await Promise.all(commentPromises);


    console.log('Blogs, Users, and Comments database info populated');
};

seed();