// A website that provides various kinds of plants based on user-submitted requirements,
// such as hardiness (climate zone), watering needs, quantity of edible plants, etc.
// This website uses the Perenual.com API to retrieve data from a plant database
// and makes this information accessible to the end user in a user-friendly way.

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

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
    // Rendering home page
    res.render("index.ejs");
});

app.get("/design-request", (req, res) => {
    // Rendering design-request page with design form
    res.render("designRequest.ejs");
});

app.post("/send-design-request", (req, res) => {
    // Sending a request to perenual.com API and rendering 
    // the resault page with the retrived data.
    res.render("resultPlantList.ejs");
});
