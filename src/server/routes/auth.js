const express = require("express");
const route = express.Router();
const { me, signUp, SignIn } = require("../handlers/auth")
const authcheck = require("../middleware/auth");
route.get("/me", authcheck,me);
route.post("/signup", signUp);
route.post("/signin",SignIn)
module.exports = route;