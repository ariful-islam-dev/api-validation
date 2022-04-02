const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { body } = require("express-validator");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

const reqBodyValidator = [
  body("name"),
  body("email"),
  body("password"),
  body("confirmPassword"),
  body("bio"),
  body("address"),
  body("skills"),
];

// handle registration
app.post("/", reqBodyValidator, (req, res) => {
  res.status(201).json({ message: "Ok" });
});

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});

// const body = {
//   name: "Ariful Islam",
//   email: "ariful@gmail.com",
//   password: "1234",
//   confirmPassword: "1234",
//   bio: "Full-Stack developer",
//   address: [
//     {
//       city: "Borisal",
//       postcode: 8224,
//     },
//     {
//       city: "Munshigonj",
//       postcode: 1522,
//     },
//   ],
//   skill: "Javascript, React, Node",
// };
