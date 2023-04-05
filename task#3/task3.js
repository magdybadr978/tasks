const express = require('express');
const app = express();

const { v4 } = require('uuid');
const router = require("express").Router();
const teams = [];
app.use("/teams" , teams);


// GET Request
router.get('/' , (req,res) =>{
    console.log(req);
    res.send(teams);
})


// POST Request  -> save data
router.post('/' ,(req,res) =>{
    const data = req.body;
    teams.push({
        id :  v4(),
        name : data.name,
        trophies : data.trophies,
        points : data.points,
    });
    res.send({
        message : "team created",
    });
})

// PUT Request -> update data
router.put('/:id' ,(req,res) => {
    const { id } = req.params;
    const data = req.body;
    const teamIndex = movies.findIndex((item) => item.id == id);
    if(teamIndex == -1){
        res.statusCode = 404;
        res.send({
            message : "team not found",
        });
    }else{
        teams[teamIndex].name = data.name;
        teams[teamIndex].trophies = data.trophies;
        teams[teamIndex].points = data.points;
        res.json(teams[teamIndex]);
    }
});

// DELETE Request -> remove specific team
router.delete('/:id' ,(req,res) =>{
    const { id } = req.params;
    const teamIndex = teams.findIndex((item) => item.id == id);
    if(teamIndex == -1){
        res.statusCode = 404;
        res.send({
            message : "team not found",
        });
    }else{
        teams.splice(teamIndex , 1);
        res.json({
            message : "team Deleted",
        })
    }
});





app.listen(4000 , "localhost" ,() =>{
    console.log("server is running");
})