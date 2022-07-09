const { db, DataTypes, Model } = require('../db');
//Creating a Blog child class from the Model parent class
class Comment extends Model{

}

Comment.init({
    content: DataTypes.TEXT,
}, {
    sequelize: db
})

//exports
module.exports = { Comment }