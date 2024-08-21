// A website that provides various kinds of plants based on user-submitted requirements,
// such as hardiness (climate zone), watering needs, quantity of edible plants, etc.
// This website uses the perenual.com API to retrieve data from a plant database
// and makes this information accessible to the end user in a user-friendly way.

// Generate your API key at: https://perenual.com/docs/api
// * Note that some of the plants requirements will require the Premium plan of perenual.com (which we don't have :)

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Seting global constants
const port = 3000;
const app = express();
const API_BASE_URL = "https://perenual.com/";
const MAX_PLANTS_OUTPUT = 10;

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
    const params = buildApiParam(req.body);
    const fullHttpReq = API_BASE_URL + "api/species-list?" + authorizationApiKey + params;
    try {
        const result = await axios.get(fullHttpReq);
        // Cutting the API data result to not exceed the defined maximum.
        const outputData = result.data.data.slice(0, MAX_PLANTS_OUTPUT);
        // Rendering the resault page with the retrived data from the API
        res.render("resultPlantList.ejs", { content: outputData, hardiness: req.body.hardiness });
    } catch (error) {
        console.log(error);
        //res.render("resultPlantList.ejs", { content: JSON.stringify(error.response.data) });
    }
});


/* Auxilery Functions */
function buildApiParam(requirements){
    var params = "";
    const reqEntries = Object.entries(requirements);
    for (let i = 0; i < reqEntries.length; i++){
        const [key, value] = reqEntries[i];
        if (!(value === "false" || !value))
            if (key === "edible")
                params += "&" + key + "=" + 1;
            else
                params += "&" + key + "=" + value;
    }
    return params
}