// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends.js");
var characters = friends.characters;
console.log(characters);
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

// var characters = [{
//     charactername: "Avengers",
//     image: "/images/avengers.jpg",
//     scores: [
//         2,
//         2,
//         5,
//         2,
//         3,
//         5,
//         1,
//         4,
//         1,
//         5
//     ]
// }, {
//     charactername: "Spider Man",
//     image: "/images/spiderman.jpg",
//     scores: [
//         3,
//         5,
//         1,
//         4,
//         2,
//         4,
//         3,
//         3,
//         1,
//         3
//     ]
// }, {
//     charactername: "Iron Man",
//     image: "/images/ironman.jpg",
//     scores: [
//         2,
//         3,
//         4,
//         4,
//         3,
//         4,
//         2,
//         1,
//         3,
//         4
//     ]
// }, {
//     charactername: "Captain America",
//     image: "/images/captainamerica.jpg",
//     scores: [
//         3,
//         2,
//         4,
//         5,
//         3,
//         1,
//         4,
//         4,
//         5,
//         4
//     ]
// }, {
//     charactername: "Deadpool",
//     image: "/images/deadpool.jpg",
//     scores: [
//         4,
//         2,
//         1,
//         2,
//         2,
//         3,
//         3,
//         5,
//         3,
//         1
//     ]
// }, {
//     charactername: "Daredevil",
//     image: "/images/daredevil.jpg",
//     scores: [
//         5,
//         1,
//         5,
//         3,
//         5,
//         2,
//         3,
//         4,
//         5,
//         5
//     ]
// }, {
//     charactername: "Guardians of the Galaxy",
//     image: "/images/guardiansofthegalaxy.jpg",
//     scores: [
//         4,
//         3,
//         3,
//         3,
//         3,
//         5,
//         1,
//         3,
//         4,
//         3
//     ]
// }, {
//     charactername: "Captain Marvel",
//     image: "/images/captainmarvel.jpg",
//     scores: [
//         4,
//         1,
//         2,
//         5,
//         2,
//         2,
//         3,
//         2,
//         2,
//         4
//     ]
// }, {
//     charactername: "Doctor Strange",
//     image: "/images/doctorstrange.jpg",
//     scores: [
//         3,
//         5,
//         5,
//         1,
//         5,
//         1,
//         1,
//         5,
//         3,
//         5
//     ]
// }, {
//     charactername: "Hulk",
//     image: "/images/hulk.jpg",
//     scores: [
//         5,
//         4,
//         4,
//         1,
//         3,
//         2,
//         4,
//         5,
//         4,
//         4
//     ]
// }, ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function(req, res) {
    var chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                // characters[i].image = 
                return res.json(characters[i]);
            }
        }

        return res.json(false);
    }
    return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
    var newcharacter = req.body;
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
charNumber++;
    console.log(charNumber);

    characters.push(newcharacter);
    return res.json(characters[charNumber]);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
