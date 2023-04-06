const express = require("express");
const app = express();
const fs = require("fs");

// GET Request
app.get("/teams", (req, res) => {
  fs.readFile("teams.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).send(data);
  });
});

// PATCH Request  -> Update data
app.patch("/teams/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("teams.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const information = JSON.parse(data);
    const teamIndex = information.findIndex((team) => team.id === id);
    if (teamIndex === -1) {
      res.status(404).send({
        message: "team not found",
      });
      return;
    }
    // information[teamIndex].id = req.body.id;
    // information[teamIndex].name = req.body.name;
    // information[teamIndex].trophies = req.body.trophies;
    // information[teamIndex].points = req.body.points;

    information[teamIndex] = {...information[teamIndex],...req.body};
    fs.writeFile("teams.json", JSON.stringify(information), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).send({
        message: "data updated successfully",
      });
    });
  });
});

app.post("/teams", (req, res) => {
  fs.readFile("teams.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const information = JSON.parse(data);
    let newData = req.body;
    information.push(newData);
    fs.writeFile("teams.json", JSON.stringify(information), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send("data added successful");
    });
  });
});

// DELETE Request -> remove specific team
app.delete("/teams/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("teams.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "err reading file",
      });
      return;
    }
    const teams = JSON.parse(data);
    const teamIndex = teams.findIndex((team) => team.id === id);

    if (teamIndex === -1) {
      res.status(404).send({
        message: "team not found",
      });
    }
    teams.splice(teamIndex, 1);
    fs.writeFile("teams.json", JSON.stringify(teams), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.status(200).send({
      message: "Team deleted",
    });
  });
});
app.listen(4000, "localhost", () => {
  console.log("server is running");
});
