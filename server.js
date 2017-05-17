// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var friends = require("./app/data/friends.js");
// var characters = friends.characters;
// console.log(characters);
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')))
var charNumber = 0;
// Marvel characters survey results
// =============================================================
var characters = require("/app/data/friends.js");

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

app.post("/api/friends", function(req, res) {
    var newcharacter = req.body;
    var charAdd = {charactername: newcharacter.name,
        image: newcharacter.photo,
        scores: newcharacter.scores}
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    // charNumber++;
    // console.log(charNumber);
    // name, photo, scores [0-9]
    var lowestDiff = 50;
    var friendNum = 0;
    for (var i = 0; i < characters.length; i++) {
        var totalDiff = 0;
        for (var j = 0; j < 10; j++) {
            totalDiff = totalDiff + Math.abs(characters[i].scores[j] - newcharacter.scores[j])
            console.log("CHAR# |INDX | CHAR |NEW: %s: %s - %s, %s", i, j, characters[i].scores[j], newcharacter.scores[j])
        }
        console.log("COMPLETED EVALUATION CHARACTER %s; total difference is %s ",i,totalDiff)
        console.log("===========================================\n\n")
        if (totalDiff < lowestDiff) {
            lowestDiff = totalDiff;
            friendNum = i
        }
    }
    console.log("best diff %d", friendNum)
    console.log("before push length of characters is %s ",characters.length)
    characters.push(charAdd);
    console.log("after push length of characters is %s ",characters.length)
    console.log("ADDED: ")
    console.log(characters[characters.length-1].charactername)
    return res.json(characters[friendNum]);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
