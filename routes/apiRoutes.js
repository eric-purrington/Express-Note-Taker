const fs = require("fs");
const path = require("path");
const express = require("express");

const notesData = require("../db/db")

module.exports = function (app) {
    
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function (req, res) {
        notesData.push(req.body);

        giveId(notesData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData), function (err) {
            if (err) throw err;
        });

        res.json(req.body);
    });

    app.delete("/api/notes/:id", function (req, res) {
        var note2Delete = parseInt(req.params.id);

        for (var i = 0; i < notesData.length; i++) {
            if (note2Delete == notesData[i].id) {
                notesData.splice(i, 1);
            }
        }

        giveId(notesData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData), function (err) {
            if (err) throw err;
        });
        
        res.json(note2Delete);
    });

}

function giveId(notesData) {

    for (var i = 0; i < notesData.length; i++) {
        notesData[i].id = i + 1;
    }

}
