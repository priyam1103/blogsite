const mongoose = require("mongoose");

function connectDb() {
    return mongoose.connect("mongodb+srv://priyam1103:priyam7035@cluster0.ll63p.mongodb.net/blogsite?retryWrites=true&w=majority", {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = { connectDb };