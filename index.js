import express from "express";
import bodyParser from "body-parser";

// Seting global constants
const port = 3000;
const app = express();

// Seting midleware and the static folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// Handeling different HTTP requests
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/design-request", (req, res) => {
    res.render("designRequest.ejs");
});
