if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(
  "/public/javascripts",
  express.static(__dirname + "/public/javascripts", { extensions: ["js"] })
);


const mongoose = require("mongoose");
const db = mongoose.createConnection(process.env.DATABASE_URL);
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));


const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");


app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);



app.listen(process.env.PORT || 3000);
