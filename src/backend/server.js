import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const isProduction = process.env.NODE_ENV === "production";
const ACCESS_TOKEN_EXPIRATION_MINUTES = parseInt(
  process.env.ACCESS_TOKEN_EXPIRATION_MINUTES || "15",
  10
);
const REFRESH_TOKEN_EXPIRATION_DAYS = parseInt(
  process.env.REFRESH_TOKEN_EXPIRATION_DAYS || "7",
  10
);
const ACCESS_TOKEN_MAX_AGE = ACCESS_TOKEN_EXPIRATION_MINUTES * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge,
});

const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

const passwordStrengthRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    jobTitle: String,
    profileImage: String,
    projects: {
      type: [
        {
          name: String,
          description: String,
          image: String,
          link: String,
        },
      ],
      default: [],
    },
    skills: {
      softSkills: { type: [String], default: [] },
      techSkills: { type: [String], default: [] },
    },
    portfolioToken: { type: String, unique: true },
    accessTokenId: { type: String },
    accessTokenHash: { type: String },
    accessTokenExpiresAt: { type: Date },
    refreshTokenId: { type: String },
    refreshTokenHash: { type: String },
    refreshTokenExpiresAt: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  jobTitle: user.jobTitle,
  profileImage: user.profileImage,
});

const isStrongPassword = (password) => passwordStrengthRegex.test(password);

const parseCookies = (req) => {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) {
    return {};
  }
  return cookieHeader.split(";").reduce((acc, pair) => {
    const [key, value] = pair.trim().split("=");
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
};

const generateTokenParts = () => {
  const id = crypto.randomBytes(8).toString("hex");
  const secret = crypto.randomBytes(32).toString("hex");
  return { id, secret, value: `${id}.${secret}` };
};

const setAuthCookies = (res, accessTokenValue, refreshTokenValue) => {
  res.cookie("accessToken", accessTokenValue, cookieOptions(ACCESS_TOKEN_MAX_AGE));
  res.cookie("refreshToken", refreshTokenValue, cookieOptions(REFRESH_TOKEN_MAX_AGE));
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);
};

const issueSession = async (user, res) => {
  const accessToken = generateTokenParts();
  const refreshToken = generateTokenParts();

  user.accessTokenId = accessToken.id;
  user.accessTokenHash = await bcrypt.hash(accessToken.secret, 10);
  user.accessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_MAX_AGE);

  user.refreshTokenId = refreshToken.id;
  user.refreshTokenHash = await bcrypt.hash(refreshToken.secret, 10);
  user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);

  await user.save();

  setAuthCookies(res, accessToken.value, refreshToken.value);
};

const authenticate = async (req, res, next) => {
  const cookies = parseCookies(req);
  const token = cookies.accessToken;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const [tokenId, tokenSecret] = token.split(".");
  if (!tokenId || !tokenSecret) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ accessTokenId: tokenId });
    if (
      !user ||
      !user.accessTokenHash ||
      !user.accessTokenExpiresAt ||
      user.accessTokenExpiresAt < new Date()
    ) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const isValid = await bcrypt.compare(tokenSecret, user.accessTokenHash);
    if (!isValid) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

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

app.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { fullName, email, password, jobTitle } = req.body;

    if (!isStrongPassword(password)) {
      return res.status(400).send({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      jobTitle,
      profileImage: req.file ? req.file.path : null,
      portfolioToken: uuidv4(),
    });

    await issueSession(user, res);

    res.status(201).send({
      user: sanitizeUser(user),
      portfolioToken: user.portfolioToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    user.portfolioToken = uuidv4();
    await issueSession(user, res);

    res.status(200).send({
      user: sanitizeUser(user),
      portfolioToken: user.portfolioToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/refresh", async (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies.refreshToken;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const [tokenId, tokenSecret] = token.split(".");
  if (!tokenId || !tokenSecret) {
    clearAuthCookies(res);
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ refreshTokenId: tokenId });

    if (
      !user ||
      !user.refreshTokenHash ||
      !user.refreshTokenExpiresAt ||
      user.refreshTokenExpiresAt < new Date()
    ) {
      clearAuthCookies(res);
      return res.status(401).send({ message: "Unauthorized" });
    }

    const isValid = await bcrypt.compare(tokenSecret, user.refreshTokenHash);
    if (!isValid) {
      clearAuthCookies(res);
      return res.status(401).send({ message: "Unauthorized" });
    }

    await issueSession(user, res);

    res.status(200).send({
      user: sanitizeUser(user),
      portfolioToken: user.portfolioToken,
    });
  } catch (error) {
    clearAuthCookies(res);
    res.status(401).send({ message: "Unauthorized" });
  }
});

app.post("/logout", async (req, res) => {
  const cookies = parseCookies(req);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  try {
    if (refreshToken) {
      const [refreshId] = refreshToken.split(".");
      const user = await User.findOne({ refreshTokenId: refreshId });
      if (user) {
        user.refreshTokenId = undefined;
        user.refreshTokenHash = undefined;
        user.refreshTokenExpiresAt = undefined;
        user.accessTokenId = undefined;
        user.accessTokenHash = undefined;
        user.accessTokenExpiresAt = undefined;
        await user.save();
      }
    } else if (accessToken) {
      const [accessId] = accessToken.split(".");
      const user = await User.findOne({ accessTokenId: accessId });
      if (user) {
        user.accessTokenId = undefined;
        user.accessTokenHash = undefined;
        user.accessTokenExpiresAt = undefined;
        await user.save();
      }
    }
  } catch (error) {
    console.error("Error clearing session", error);
  }

  clearAuthCookies(res);
  res.status(200).send({ message: "Logged out" });
});

app.get("/me", authenticate, (req, res) => {
  res.status(200).send({
    user: sanitizeUser(req.user),
    portfolioToken: req.user.portfolioToken,
  });
});

app.post("/portfolio/token/rotate", authenticate, async (req, res) => {
  try {
    req.user.portfolioToken = uuidv4();
    await req.user.save();
    res.status(200).send({ portfolioToken: req.user.portfolioToken });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/projects", authenticate, (req, res) => {
  res.status(200).send(req.user.projects || []);
});

app.post("/projects", authenticate, upload.single("image"), async (req, res) => {
  const { name, description, link } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!Array.isArray(req.user.projects)) {
      req.user.projects = [];
    }

    req.user.projects.push({ name, description, image, link });
    await req.user.save();
    const createdProject = req.user.projects[req.user.projects.length - 1];

    res.status(201).send({
      id: createdProject._id.toString(),
      name: createdProject.name,
      description: createdProject.description,
      image: createdProject.image,
      link: createdProject.link,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put(
  "/projects/:projectId",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    const { name, description, link } = req.body;
    const projectId = req.params.projectId;

    try {
      const project = req.user.projects.find(
        (proj) => proj._id.toString() === projectId
      );

      if (!project) {
        return res.status(404).send({ message: "Project not found" });
      }

      project.name = name ?? project.name;
      project.description = description ?? project.description;
      project.link = link ?? project.link;
      if (req.file) {
        project.image = req.file.path;
      }

      await req.user.save();

      res.status(200).send({
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        image: project.image,
        link: project.link,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

app.delete("/projects/:projectId", authenticate, async (req, res) => {
  try {
    const projectIndex = req.user.projects.findIndex(
      (project) => project._id.toString() === req.params.projectId
    );

    if (projectIndex === -1) {
      return res.status(404).send({ message: "Project not found" });
    }

    req.user.projects.splice(projectIndex, 1);
    await req.user.save();

    res.status(200).send({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/skills", authenticate, (req, res) => {
  res.status(200).send(req.user.skills || { softSkills: [], techSkills: [] });
});

app.put("/skills", authenticate, async (req, res) => {
  const { skills } = req.body;
  if (!skills) {
    return res.status(400).send({ message: "Skills payload is required" });
  }

  try {
    req.user.skills.softSkills = skills.softSkills || [];
    req.user.skills.techSkills = skills.techSkills || [];
    await req.user.save();
    res.status(200).send(req.user.skills);
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

app.put("/user", authenticate, async (req, res) => {
  const { fullName, email, jobTitle } = req.body;

  try {
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        return res.status(400).send({ message: "Email already in use" });
      }
    }

    req.user.fullName = fullName ?? req.user.fullName;
    req.user.email = email ?? req.user.email;
    req.user.jobTitle = jobTitle ?? req.user.jobTitle;
    await req.user.save();

    res.status(200).send({ user: sanitizeUser(req.user) });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to the db");
    app.listen(process.env.PORT || 3001, () =>
      console.log("Server is running on port " + (process.env.PORT || 3001))
    );
  })
  .catch((err) => console.log(err));
