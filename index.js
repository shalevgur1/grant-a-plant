// A website that provides various kinds of plants based on user-submitted requirements,
// such as hardiness (climate zone), watering needs, quantity of edible plants, etc.
// This website uses the perenual.com API to retrieve data from a plant database
// and makes this information accessible to the end user in a user-friendly way.

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Seting global constants
const port = 3000;
const app = express();
const API_BASE_URL = "https://perenual.com/";

// Seting midleware and the static folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Setting API key to interact with the perenual.com API
const apiKey = "sk-Y0kc66b98f69724d46496";                            // Change API key in this line!
const authorizationApiKey = "key=" + apiKey;

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

app.post("/send-design-request", async (req, res) => {
    // Sending a request to perenual.com API
    console.log(req.body);
    //console.log(req);
    // try {
    //     const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    //     res.render("index.ejs", { content: JSON.stringify(result.data) });
    // } catch (error) {
    //     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    // }

    // Rendering the resault page with the retrived data from the API
    res.render("resultPlantList.ejs");
});
