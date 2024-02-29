const mongoose = require("mongoose");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/uploads", express.static("uploads"));

app.use(express.json());

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  jobTitle: String,
  profileImage: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/register", upload.single("profileImage"), (req, res) => {
  User.findOne({ email: req.body.email }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).send({ message: "User already registered." });
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      const user = new User({
        ...req.body,
        password: hashedPassword,
        profileImage: req.file ? req.file.path : null,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Invalid email or password" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          if (!isMatch) {
            return res
              .status(404)
              .send({ message: "Invalid email or password" });
          }
          res.status(200).send({ message: "Logged in successfully" });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
});

const dbURI =
  "mongodb+srv://roxanaturc25:FdpFiOq9fL2eciTz@portfoliobuilder.rfciaq1.mongodb.net/Users?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to the db");
    app.listen(3001, () => console.log("Server is running on port 3001"));
  })
  .catch((err) => console.log(err));
