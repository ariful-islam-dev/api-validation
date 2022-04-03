const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

// handle registration
app.post("/", (req, res) => {
  const validate = ajv.compile(require("./registration.schema.json"));
  const valid = validate(req.body);
  if (!valid) {
    console.log(validate.errors);
    return res.status(400).json(validate.errors);
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
