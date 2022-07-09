const { db, DataTypes, Model } = require('../db');
//Creating a Blog child class from the Model parent class
class User extends Model{

}

User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
}, {
    sequelize: db
})

//exports
module.exports = { User }