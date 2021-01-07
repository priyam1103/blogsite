const express = require("express");
const route = express.Router();
const { PostBlog , getBlogs ,getBlog , getUserBlogs,getCategoryBlogs} = require("../handlers/blog")
const auth = require("../middleware/auth");

route.post("/postblog",auth, PostBlog);
route.get("/getblogs", getBlogs);
route.get("/getblog/:blog_id", getBlog);
route.get("/getuserblogs/:userid", auth, getUserBlogs);
route.get("/getcategoryblogs/:category", getCategoryBlogs);
module.exports = route;