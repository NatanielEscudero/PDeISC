const db = require("../db/connection");

const insertScore = (nombre, tiempo, puntos, cb) => {
    db.query("INSERT INTO score (nombre, tiempo, puntos) VALUES (?, ?, ?)", 
        [nombre, tiempo, puntos], cb);
};

const getScores = (cb) => {
    db.query("SELECT * FROM score ORDER BY puntos DESC", cb);
};

module.exports = { insertScore, getScores };
