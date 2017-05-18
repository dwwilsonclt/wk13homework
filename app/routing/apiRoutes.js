var characters = require("../data/friends.js");

module.exports = function(app) {

    app.post("/api/friends", function(req, res) {
        var newcharacter = req.body;
        var charAdd = {
                charactername: newcharacter.name,
                image: newcharacter.photo,
                scores: newcharacter.scores
            }
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
            }
            if (totalDiff < lowestDiff) {
                lowestDiff = totalDiff;
                friendNum = i
            }
        }
        characters.push(charAdd);
        return res.json(characters[friendNum]);
    });
}
