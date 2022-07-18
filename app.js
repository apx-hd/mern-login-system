const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://aabiskar_pandey:aabiskar123@cluster0.3cnv3.mongodb.net/login-system?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Middleware to check the info of the user who is logged in
app.get('*', checkUser)
// routes
app.get("/", (req, res) => {
  res.render('home');

});
app.get("/burgers", requireAuth, (req, res) => res.render("burgers"));
app.use(authRoutes);
