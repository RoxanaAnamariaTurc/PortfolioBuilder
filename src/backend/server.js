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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  jobTitle: String,
  profileImage: String,
  projects: [
    {
      name: String,
      description: String,
      image: String,
      link: String,
    },
  ],
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
});
app.post("/login", (req, res) => {
  console.log("Handling /login request");
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);
  User.findOne({ email })
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        return res.status(404).send({ message: "Invalid email or password" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log("Password is correct");
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (!isMatch) {
          console.log("Password is incorrect");
          return res.status(404).send({ message: "Invalid email or password" });
        }
        res.status(200).send({
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            jobTitle: user.jobTitle,
            profileImage: user.profileImage,
          },
        });
      });
    })
    .catch((err) => {
      console.log("Error finding user:", err);
      res.status(500).send({ message: err.message });
    });
});

app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({
        user: {
          fullName: user.fullName,
          email: user.email,
          jobTitle: user.jobTitle,
          profileImage: user.profileImage,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

app.post("/projects", upload.single("image"), (req, res) => {
  const { userId, name, description, link } = req.body;
  const image = req.file ? req.file.path : null;
  User.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.projects.push({ name, description, image, link });
    user
      .save()
      .then((result) => {
        res.status(201).send(result.projects);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
});

app.get("/projects/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user.projects);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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
