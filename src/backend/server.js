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
  skills: {
    softSkills: [String],
    techSkills: [String],
  },
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
  const { email, password } = req.body;
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

app.get("/user/:id/skills", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user.skills);
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
    const newProject = { name, description, image, link };
    user.projects.push(newProject);
    user
      .save()
      .then((result) => {
        const createdProject = result.projects.find(
          (project) =>
            project.name === newProject.name &&
            project.description === newProject.description
        );
        res.status(201).send({
          id: createdProject._id.toString(),
          name: createdProject.name,
          description: createdProject.description,
          image: createdProject.image,
          link: createdProject.link,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
});
app.post("/user/:id/skills", (req, res) => {
  const { skills } = req.body;
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.skills.softSkills = skills.softSkills;
      user.skills.techSkills = skills.techSkills;
      user
        .save()
        .then((result) => {
          res.status(201).send(result.skills);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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

app.put("/projects/:userId/:projectId", upload.single("image"), (req, res) => {
  const { name, description, link } = req.body;
  const image = req.file ? req.file.path : null;
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const project = user.projects.find(
        (project) => project._id.toString() === req.params.projectId
      );
      project.name = name;
      project.description = description;
      project.image = image;
      project.link = link;
      user
        .save()
        .then((result) => {
          res.status(200).send(result.projects);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
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
