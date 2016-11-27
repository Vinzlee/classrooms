/**
 * This program belongs to Vincent CHOLLET.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on vinz.chollet@gmail.com
 *
 * @author         Vincent CHOLLET
 * @company        -
 * @version        1.0
 * @date           27/11/2016
 */


/********************************* IMPORTS *********************************/

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

/******************************** DEFINITION *******************************/

//Build the server
const app = express();

//Build the DataBase
const mongo = mongodb.MongoClient;

//Set the parser middleware to read the body requests/responses of Express
app.use(bodyParser.urlencoded({extended: true}));

//Connect to the database

//Start the server
app.listen(3000, () => {

    console.log("listening on 127.0.0.1:3000");

    app.get("/", (request, response) => {
        response.sendFile(__dirname + "/views/main.html");
    });

    app.post("/quotes", (request, response) => {
        console.log("Post has been sent :");
        console.log(request.body);
    });

});
