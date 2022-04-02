const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Joi = require("joi");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

// Post Schema
const schema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Name Must Be String",
    "string.min": "Minimum Length 3",
    "string.max": "Maximum Length 30",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "info"] },
    })
    .normalize()
    .custom((value) => {
      if (value === "test@gmail.com") {
        throw new Error("email already in use");
      }
      return value;
    })
    .required()
    .messages({
      "any.custom": "Email Already is in use",
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,30}/)
    )
    .message({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, digit and special chars",
    })
    .required(),
  confirmPassword: Joi.ref("password"),
  bio: Joi.string().trim().min(20).max(300),
  addresses: Joi.array().items(
    Joi.object({
      city: Joi.string(),
      postcode: Joi.number(),
    })
  ),
});

// handle registration
app.post("/", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    return res.status(400).json(result.error.details);
  }
  console.log(result.value);
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
