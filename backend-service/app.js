var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var process = require("process");
var { connectDB, cleanup } = require("./models/db.js");

const cors = require("cors");

var indexRouter = require("./routes/index");
var clientRouter = require("./routes/client");
var trainerRouter = require("./routes/trainer");
var adminRouter = require("./routes/admin");
// Test for workshopRequest
var workshopRequestRouter = require("./routes/workshop");
// Test for leaveRequest
var leaveRequestRouter = require("./routes/leaveRequest");
var app = express();

// Enable CORS
app.use(cors()); // remember to remove once we deploy / configured cors
app.use(bodyParser.json()); // to parse application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/client", clientRouter);
app.use("/trainer", trainerRouter);
app.use("/admin", adminRouter);
// Test for workshopRequest
app.use("/workshop", workshopRequestRouter);
// Test for leaveRequest
app.use("/leaveRequest", leaveRequestRouter);

// Connect to MongoDB
const dbConnectionPromise = connectDB().then(() => {
  // Cleanup on exit
  process.on("SIGINT", async () => {
    await cleanup();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await cleanup();
    process.exit(0);
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, dbConnectionPromise };