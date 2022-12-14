const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { authenticateToken, createToken } = require("../Utills/jwt");

// gets back all the users
router.get("/", async (req, res) => {
  try {
    authenticateToken(req, res);
    if (!req.user) {
      return;
    }
    const users = await Users.find({}, "-password");

    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    Users.findOne({ email: req.body.email }, async (error, result) => {
      if (result) {
        const match = await bcrypt.compare(req.body.password, result.password);
        if (match) {
          const token = createToken({ email: req.body.email });
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "incorrect email or password" });
        }
      } else {
        res.status(404).json({ message: "Account does not exist" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// register a user
router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 13);
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    userRole: req.body.userRole,
  });
  try {
    await user.save();
    const token = createToken({ email: req.body.email });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// specific user
router.get("/:usersId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.usersId, "-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// delete a user
router.delete("/:usersId", async (req, res) => {
  try {
    const removedUser = await Users.deleteOne({ _id: req.params.usersId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// update a user
router.patch("/:usersId", async (req, res) => {
  try {
    const UpdatedUser = await Users.updateOne(
      { _id: req.params.usersId },
      { $set: { name: req.body.name } }
    );
    res.status(200).json(UpdatedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
module.exports = router;
