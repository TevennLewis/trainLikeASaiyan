const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

router.get("/register", function (req, res) {
  return res.render("auth/register");
});

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.post("/register", async function (req, res) {
  try {
    const foundUser = await User.exists({ username: req.body.username });
    if (foundUser) {
      return res.redirect("/login");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    const newUser = await User.create(req.body);

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.post("/login", async function (req, res) {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    console.log(foundUser);

    if (!foundUser) return res.redirect("/register");

    
    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) return res.send("password invalid");

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    };

    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/logout", async function (req, res) {
  try {
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

module.exports = router;