var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;


var notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

app.get("/api/notes", function (req, res) {
    res.json(notes);
})





app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});