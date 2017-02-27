/**
 * This program belongs to Vincent CHOLLET.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on vinz.chollet@gmail.com
 *
 * @author         Vincent CHOLLET
 * @company        -
 * @version        1.0
 * @date           28/01/2017
 */

"use strict";

/********************************* IMPORTS *********************************/

const express = require("express");
const bodyParser = require("body-parser");
const graph = require("fbgraph");

/******************************** DEFINITION *******************************/

const conf = {
    client_id:      '581930852013834',
    client_secret:  'f85f09572ad2e526a02073beab7df981',
    scope:          'email, user_about_me, user_birthday, user_location, publish_actions',
    redirect_uri:   'http://localhost:3000/auth'
};

//Build the server
const app = express();

//Set the parser middleware to read the body requests/responses of Express
app.use(bodyParser.urlencoded({extended: true}));

//Connect to the database

//Start the server
app.listen(3000, () => {

    console.log("listening on 127.0.0.1:3000");

    app.get("/", (request, response) => {
        response.send("Welcome on Home Page");
    });

    app.get("/auth", (request, response) => {

        //Redirect to the oauth dialog if no code has been set
        if ( !request.query.code ) {
            console.log("Performing oauth for some user right now.");

            let authUrl = graph.getOauthUrl({
                "client_id":      conf.client_id,
                "redirect_uri":   conf.redirect_uri,
                "scope":          conf.scope
            });

            //checks whether a user denied the app facebook login/permissions
            if ( !request.query.error ) {
                response.redirect(authUrl);
            }
            else {
                response.send('access denied');
            }
        }
        else {
            console.log("Oauth successful, the code (whatever it is) is: ", request.query.code);
            graph.authorize({
                "client_id":      conf.client_id,
                "redirect_uri":   conf.redirect_uri,
                "client_secret":  conf.client_secret,
                "code":           request.query.code
            }, (err, facebookRes) => {
                response.redirect('/UserHasLoggedIn');
            });
        }
    });

    app.get('/UserHasLoggedIn', (request, response) => {
        response.send("Logged in");
        graph.get("/me",{fields: 'name, email'}, (error, result) => {
            if( error ) {
                console.log(error);
            }
            else {
                console.log(result.email);
            }
        });
    });
});
