
var path = require("path");
module.exports = function(app) {

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// app.get("/add", function(req, res) {
//     res.sendFile(path.join(__dirname, "add.html"));
// });

// app.get("/all", function(req, res) {
//     res.sendFile(path.join(__dirname, "all.html"));
// });
}