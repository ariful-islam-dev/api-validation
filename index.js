const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

const people = {
  ariful: {
    firstName: "Ariful",
    lastName: "Islam",
    email: "ariful@gmail.com",
  },
  aysha: {
    firstName: "Aysha",
    lastName: "Mony",
    email: "aysha@gmail.com",
  },
};

app.get("/", (req, res) => {
  const username = req.query.username.toString();
  res.status(200).json(people[username]);
});

app.post("/", (req, res) => {
  const { name, username, email } = req.body;
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[2] || "";
  people[username.toString()] = { firstName, lastName, email };
  res.status(201).json(people[username.toString()]);
});

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
