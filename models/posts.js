//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    name: String,
    body: String,
    comments: [
        {
            name:String,
            body: String
        }
    ],
    like: Number,
    createAt: Date
});
module.exports.Posts = mongoose.model('Post',postsSchema);