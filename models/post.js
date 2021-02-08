//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    name: String,
    body: String,
    description: String,
    comments: [        
        {
            name:String,
            body: String
        }
    ],
    like: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports.Post = mongoose.model('Post',postsSchema);