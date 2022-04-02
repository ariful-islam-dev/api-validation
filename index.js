const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const validator = require('validator')

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
  const username = req.query.username;
  if (!username) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "username query parameter missing",
      });
  }
  res.status(200).json(people[username.toLocaleLowerCase()]);
});

app.post("/", (req, res) => {
  const { name, username, email } = req.body;

  if(!name){
      return res.status(400).json({
          error: 'Bad Request',
          massage: 'name is missing'
      })
  }


  if(!username){
      return res.status(400).json({
          error: 'Bad Request',
          massage: 'username is missing'
      })
  }


  if(!email){
      return res.status(400).json({
          error: 'Bad Request',
          massage: 'email is missing'
      })
  }

  if(!validator.isEmail(email)){
      return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid Email'
      })
  }

  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[1] || "";
  people[username.toString()] = { firstName, lastName, email };
  res.status(201).json(people[username.toLowerCase()]);
});

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
