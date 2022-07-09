const { Blog } = require('./Blog');
const { User } = require('./User');
const { Comment } = require('./Comment');

Blog.belongsTo(User);
User.hasMany(Blog);
Comment.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(Blog);
Blog.hasMany(Comment);

module.exports = { Blog, User, Comment };