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
    .withMessage("Name must be a valid string")
    .bail()
    .isLength({ min: 5, max: 30 })
    .withMessage("name length must be between 5-30 chars"),
  body("email")
    .normalizeEmail({ all_lowercase: true })
    .isEmail()
    .withMessage("Please provide a valid email")
    .bail()
    .custom((value) => {
      if (value === "ariful@gmail.com") {
        throw new Error("email already used");
      }
      return true;
    }),
  body("password")
    .isString()
    .withMessage("Password must be a valid string")
    .bail()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password length must be between 8-30 chars")
    .bail()
    .matches(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/)
    .withMessage(
      "Password must contain uppercase, lowercase, digit ans special chars"
    ),
  body("confirmPassword")
    .isString()
    .withMessage("Confirm Password must be a valid string")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Does not Match");
      }
      return true;
    }),
  body("bio")
    .optional()
    .trim()
    .escape()
    .isString()
    .isLength({ min: 20, max: 300 })
    .withMessage("bio must be between 20-300 chars"),
  body("address")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Address must be an array of address");
      }
      return true;
    }),
  body("addresses.*.postcode")
    .isNumeric()
    .withMessage("Postcode must be numeric")
    .toInt(),
  body("skills")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Skills must be a comma separated string")
    .customSanitizer((value)=>{
     return value.split(',').map(item => item.trim())
    })
    
];

// handle registration
app.post("/", reqBodyValidator, (req, res) => {

  const errorFormatter = ({  msg, param }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return ` ${msg}`;
  };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  console.log('Request Body', req.body);
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
