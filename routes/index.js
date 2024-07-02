"use strict";

var express = require("express");
var path = require("path");
// var app = express();
var router = express.Router();

// app.use(
//   express.static(
//     path.join(
//       __dirname,
//       "../frontend-service/react-res-management-app",
//       "public"
//     )
//   )
// );

// app.get("*", function (req, res) {
//   res.sendFile(
//     path.join(
//       __dirname,
//       "../frontend-service/react-res-management-app",
//       "public",
//       "index.html"
//     )
//   );
// });

// var PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
