const express = require("express");
module.exports = function (app) {
    app.use(express.json());
    app.use("/api/auth", require("../routes/auth"));
    app.use("/api/blog", require("../routes/blogs"));
}