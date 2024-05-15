import mongoose from "mongoose";
import express from "express";
const app = express();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import cors from "cors";
import bcrypt from "bcrypt";
app.use("/uploads", express.static("uploads"));
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://nimble-fairy-0b2928.netlify.app"]
    : ["http://localhost:3002"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  next();
});

const { v4: uuidv4 } = require("uuid");

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
  portfolioToken: { type: String, unique: true },
});

const User = mongoose.model("User", UserSchema);

// Route to generate a portfolio token
app.post("/generate-portfolio-token", async (req, res) => {
  const { userId } = req.body;
  const token = uuidv4();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.portfolioToken = token;
    await user.save();
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to fetch portfolio data using the token
app.get("/portfolio/:token", async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ portfolioToken: token });
    if (!user) {
      return res.status(404).send({ message: "Portfolio not found" });
    }
    res.status(200).send({
      user: {
        fullName: user.fullName,
        email: user.email,
        jobTitle: user.jobTitle,
        profileImage: user.profileImage,
        projects: user.projects,
        skills: user.skills,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

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

app.get("/user/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ portfolioToken: token });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({
      user: {
        fullName: user.fullName,
        email: user.email,
        jobTitle: user.jobTitle,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/user/:token/skills", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ portfolioToken: token });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user.skills);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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
app.post("/user/:token/skills", async (req, res) => {
  const { skills } = req.body;
  const { token } = req.params;
  try {
    const user = await User.findOne({ portfolioToken: token });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.skills.softSkills = skills.softSkills;
    user.skills.techSkills = skills.techSkills;
    await user.save();
    res.status(201).send(user.skills);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/projects/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ portfolioToken: token });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user.projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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

app.delete("/users/:userId/projects/:projectId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const projectIndex = user.projects.findIndex(
      (project) => project._id.toString() === req.params.projectId
    );
    if (projectIndex === -1) {
      return res.status(404).send({ message: "Project not found" });
    }

    user.projects.splice(projectIndex, 1);
    await user.save();

    res.status(200).send({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// const dbURI =
//   "mongodb+srv://roxanaturc25:FdpFiOq9fL2eciTz@portfoliobuilder.rfciaq1.mongodb.net/Users?retryWrites=true&w=majority";

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to the db");
    app.listen(process.env.PORT || 3001, () =>
      console.log("Server is running on port " + (process.env.PORT || 3001))
    );
  })
  .catch((err) => console.log(err));
