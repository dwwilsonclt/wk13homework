// =============================================================
// DEPENDENCIES
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(express.static('images'));
// app.use('/images', express.static(path.join(__dirname, 'images')))
// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
app.use('/images', express.static(path.join(__dirname, 'app/images')))
// app.use('/images', express.static('.app/images'))


// ==============================================================================
// LISTENER
// ==============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
