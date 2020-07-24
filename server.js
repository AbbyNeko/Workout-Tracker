const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercise_db", {useNewUrlParser: true});

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});