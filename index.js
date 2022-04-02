const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

const reqBodyValidator = [
  body("name")
    .trim()
    .isString()
    .withMessage('Name must be a valid string')
    .bail()
    .isLength({ min: 5, max: 30 }).withMessage('name length must be between 5-30 chars'),
  body("email")
    .normalizeEmail({all_lowercase: true})
    .isEmail()
    .withMessage('Please provide a valid email')
    .custom((value)=>{
      if(value === 'ariful@gmail.com'){
        throw new Error('email already used')
      }
      return true
    }),
  body("password"),
  body("confirmPassword"),
  body("bio"),
  body("address"),
  body("skills"),
];

// handle registration
app.post("/", reqBodyValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
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
