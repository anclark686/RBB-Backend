const express = require("express");
const userModel = require("../models/models");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
      console.log("User successfully added")
    } catch (error) {
      console.log(error)
      response.status(500).send(error);
    }
});

app.post("/users", async (request, response) => {
    const users = await userModel.find({username: request.body.username});
  
    try {
      response.send(users);
    } catch (error) {
      
      response.status(500).send(error);
      
    }
  });

  app.post("/delete_user", async (request, response) => {
  
    try {
      userModel.findByIdAndDelete(request.body.id)
        .lean().exec((err, results) => {
          if (err) return console.log(err)
          console.log(results)
          if (results != null) {
            response.send(`Deleted ${results.name}`)
          } else {
            response.send("Not Found")
          }
        })
    } catch (error) {
      response.status(500).send(error);
    }
});

module.exports = app; 