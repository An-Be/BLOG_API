const { db, DataTypes, Model } = require('../db');

//Creating a Blog child class from the Model parent class
class Blog extends Model{

}

Blog.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    topic: DataTypes.STRING
}, {
    sequelize: db
})

//exports
module.exports = { Blog }