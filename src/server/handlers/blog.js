const Blog = require("../models/blog")
const User = require("../models/user");
exports.PostBlog = async function (req, res) {
    try {
        const { title,readtime, story , tagname} = req.body;
        
        const user_id = res.locals._id;
        const current_user = await User.findOne({ _id: user_id });
        const postedby = {
            id:current_user.id,
            name: current_user.username,
            emailId:current_user.emailId
        }

        const blog = new Blog({
            title: title,
            postedby: postedby,
            story: story,
            tagname: tagname,
            readtime:readtime
            
        })

        await blog.save();
        await current_user.blogs.push(blog._id);
        await current_user.save();
        res.status(200).json({message:"Blog posted"})
        
    } catch (err) {
        res.status(400).json({ message: "Error" })
        console.log(err)
    }
}

exports.getBlogs = async function (req, res) {
    try {
        const blogs = await Blog.find();
        res.status(200).json({blogs})
    } catch (err) {
        res.status(400).json({message:"Error"})
    }
}
exports.getBlog = async function (req, res) {
    try {
        const blog_id = req.params.blog_id;
        const blog = await Blog.findOne({ _id: blog_id });
        if(blog)
            res.status(200).json({ blog })
        else
            res.status(400).json({message:"Invalid blog id"})
    } catch (err) {
        res.status(400).json({ message: "Error" })
        console.log(err)
    }
}

exports.getUserBlogs = async function (req, res) {
    try {
        const userid = req.params.userid;
        const user = await User.findOne({ _id: userid });
        if (user) {
            var blogs = [];
            if (user.blogs.length === 0) {
                res.status(200).json({ blogs, user })
            } else {
                new Promise((resolve, reject) => {
          
        
                    user.blogs.map(async (item, index) => {
                        const blog = await Blog.findOne({ _id: item });
                        blogs.push(blog);
                        if (index === user.blogs.length - 1) {
                            resolve();
                        }
                    })
                }).then(() => {
                    res.status(200).json({ blogs, user })
        
                })
            }
        } else {
            res.status(401).json({message:"user not found"})
        }
    } catch (err) {
        res.status(400).json({ message: "Error" })
        console.log(err)
    }
}

exports.getCategoryBlogs = async function (req, res) {
    try {
        const category = req.params.category;
        const blogs = await Blog.find({ tagname: { $eq: category } });
        res.status(200).json({ blogs });
    } catch (err) {
        res.status(400).json({message:"Error"})
    }
}