const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter.js");
const userSettingsController = require("./authController/userSettingsController.js");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/User.js");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer");
const upload = multer({ dest: "public/temp/" });
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    cookie: {
      maxAge: 1296000000,
    },
    secret: process.env.ACCESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

const favoriteUrl = "https://api.themoviedb.org/3/account/20688918/favorite";
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWIyMWU5ZjQxNzhjMWZjNjRkYTQwZDhkMThlNjBiMiIsInN1YiI6IjY1NGQwMjhlYjE4ZjMyMDBhYzNlZWU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9EVef75xfBpxCX2PXp5amYKwvu0YRQ2ZINKNgWiHh6Q",
  },
  body: JSON.stringify({media_type: 'movie', media_id: 550, favorite: true})
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));

app.get("/auth", (req, res) => {
  res.sendFile(__dirname + "/public/auth.html");
});

app.get("/auth/registration", (req, res) => {
  if (req.session.user) {
    res.send("Вы уже авторизованы");
  } else {
    res.sendFile(__dirname + "/public/registration.html");
  }
});

app.get("/auth/login", (req, res) => {
  if (req.session.user) {
    res.send("Вы уже авторизованы");
  } else {
    res.sendFile(__dirname + "/public/login.html");
  }
});

app.get("/auth/settings", (req, res) => {
  res.sendFile(__dirname + "/public/userSettings.html");
});

app.get("/", (req, res) => {
  res.send("eetgf");
});

app.get("/profile", async (req, res) => {
  if (req.session.user) {
    res.render("profile", {
      name: req.session.user.username,
      id: req.session.user.id,
      avatar: req.session.user.avatar,
      bio: req.session.user.bio,
    });
  } else {
    res.send("Вы не авторизованы.");
  }
});

app.post(
  "/profile",
  upload.single("file"),
  userSettingsController.userSettings
);
app.use("/auth", authRouter);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/auth/login");
  });
});

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Приложение cлушает на порту ${PORT}`);
    });

    console.log("База данных успешно подключена");
  } catch (e) {
    console.log(e);
  }
}

start();
