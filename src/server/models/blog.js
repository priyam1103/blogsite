const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    story: {
        type: String,
        required:true
    },
    postedby: {
        type:Object
    },
    tagname: {
        type:String
    },
    readtime: {
        type:String
    }
})

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;