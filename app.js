require('dotenv').config()

const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      bodyparser     = require("body-parser"),
      path           = require("path");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});
                   
//requiring routes
const Routes = require("./routes/routes");

app.use(Routes);

// Only listen if not in serverless environment
if (process.env.VERCEL !== "1") {
    app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
        console.log("Blog server is running");
    });
}

module.exports = app;