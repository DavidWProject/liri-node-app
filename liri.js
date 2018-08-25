//      Loading Noding Modules
require("dotenv").config();

var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api'); 
var fs = require("fs");


//      Loading User Twitter Keys

var keys = require("./keys.js");

var twitterKeys = keys.twitter;
var spotifyKeys = keys.spotify; 
// console.log(twitterKeys); 

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//      Input Command Argument Variable
var inputCommands = process.argv[2];
var nodeArgs = process.argv;

//      Create an empty variable for holding the movie name
var movieName = "";

//      List of Valid Arguements
var listOfValidCommands = ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"];


if (inputCommands === listOfValidCommands[0]) {

    var client = new Twitter(twitterKeys);

    var params = {
        screen_name: "DavidWo38412302",
        count: 10
    };

    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (error) {
            var errorMessage = "Error: Retrieving user tweets: " + error;

            fs.appendFile("./log.txt", errorMessage, function (err) {
                if (err) throw err;
                console.log(errorMessage);
            });
        
        } else {
            var tweetMessage = "=====================\n" +
                "==== User Tweets ====\n" +
                "=====================\n";

            for (var i = 0; i < tweets.length; i++) {
                if (i = tweets.length - 1) {
                    tweetMessage += "Tweeted at: " + tweets[i].created_at + "\n" + "Tweet Message: " + tweets[i].text + "\n" + "=====================\n";
                    console.log(tweetMessage);
                }

            }

        }
    });
}

if (inputCommands === listOfValidCommands[1]) {
    var defaultAlbum = "Greatest Hits"; 

    if (process.argv.length === 3) {
            console.log("=====================\n")
            console.log("Artist: Ace of Base \n"); 
            console.log("=====================\n")
            console.log("Song Name: The Sign \n"); 
            console.log("=====================\n")
            console.log("Song Preview Link: https://open.spotify.com/album/0nQFgMfnmWrcWDOQqIgJL7\n"); 
            console.log("=====================\n")
            console.log("Album of where the song is from: Greatest Hits"); 
            console.log("=====================\n")
            console.log("Album of where the song is from: https://open.spotify.com/album/0nQFgMfnmWrcWDOQqIgJL7\n"); 
            console.log("=====================\n")
    } 

    if (process.argv.length === 4) {


        console.log("You just searched spotify for " + process.argv[3] + "\n"); 
            
            spotify.search({ type: 'track', query: process.argv[3], limit: 2 }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            // console.log(JSON.stringify(data.tracks, null, 2)); 
            console.log("=====================\n")
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Song Preview Link: " + JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Album of where the song is from: " + JSON.stringify(data.tracks.items[0].album.name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Link to the Album of where the song is from: " + JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2) + "\n"); 
            console.log("=====================\n")

            console.log("=====================\n")
            console.log("Artist: " + JSON.stringify(data.tracks.items[1].album.artists[0].name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Song Name: " + JSON.stringify(data.tracks.items[1].name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Song Preview Link: " + JSON.stringify(data.tracks.items[1].album.external_urls.spotify, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Album of where the song is from: " + JSON.stringify(data.tracks.items[1].album.name, null, 2) + "\n"); 
            console.log("=====================\n")
            console.log("Link to the Album of where the song is from: " + JSON.stringify(data.tracks.items[1].album.external_urls.spotify, null, 2) + "\n"); 
            console.log("=====================\n")
            });
        
        
    }

     

    

    
    // * The album that the song is from
    
}

if (inputCommands === listOfValidCommands[2]) {

    if (process.argv.length === 4) {
        movieName = process.argv[3]; 
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
        request(queryUrl, function (error, response, body) {
    
            // If the request is successful
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(body, null, 2)); 
                console.log("=====================\n")
                console.log("Title of the Movie: " + JSON.parse(body, null, 2).Title  + "\n"); 
                console.log("=====================\n")
                console.log("Release Year: " + JSON.parse(body).Year + "\n");
                console.log("=====================\n")
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("=====================\n")
                console.log("Rotten Tomatoes' Rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("=====================\n")
                console.log("Countries where the movie was produced: " + JSON.parse(body).Country + "\n");
                console.log("=====================\n")
                console.log("Language of the movie: " + JSON.parse(body).Language + "\n");
                console.log("=====================\n")
                console.log("Plot of the movie: " + JSON.parse(body).Plot + "\n");
                console.log("=====================\n")
                console.log("Actors in the movie: " + JSON.parse(body).Actors + "\n");

            }

        });
    } else {
        movieName = "Mr. Nobody"; 
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
        request(queryUrl, function (error, response, body) {
    
            // If the request is successful
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(body, null, 2)); 
                console.log("=====================\n")
                console.log("Title of the Movie: " + JSON.parse(body, null, 2).Title  + "\n"); 
                console.log("=====================\n")
                console.log("Release Year: " + JSON.parse(body).Year + "\n");
                console.log("=====================\n")
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("=====================\n")
                console.log("Rotten Tomatoes' Rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("=====================\n")
                console.log("Countries where the movie was produced: " + JSON.parse(body).Country + "\n");
                console.log("=====================\n")
                console.log("Language of the movie: " + JSON.parse(body).Language + "\n");
                console.log("=====================\n")
                console.log("Plot of the movie: " + JSON.parse(body).Plot + "\n");
                console.log("=====================\n")
                console.log("Actors in the movie: " + JSON.parse(body).Actors + "\n");

            }

        });
    }

}

if (inputCommands === listOfValidCommands[3]) {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        // console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        // console.log(dataArr);

        console.log("You just searched spotify for " + dataArr[1] + "\n"); 
            
        spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        // console.log(JSON.stringify(data.tracks, null, 2)); 
        console.log("=====================\n")
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2) + "\n"); 
        console.log("=====================\n")
        console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2) + "\n"); 
        console.log("=====================\n")
        console.log("Song Preview Link: " + JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2) + "\n"); 
        console.log("=====================\n")
        console.log("Album of where the song is from: " + JSON.stringify(data.tracks.items[0].album.name, null, 2) + "\n"); 
        console.log("=====================\n")
        console.log("Link to the Album of where the song is from: " + JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2) + "\n"); 
        console.log("=====================\n")
        });
      
    });

}

//     fs.appendFile("./log.txt", "User Command: " + process.argv + "\n", (err) => {
//         if (err) throw err;

//         // If the user types in a command that LIRI does not recognize, output the Usage menu 
//         // which lists the available commands.
//         outputStr = "Usage:\n" +
//             "    node liri.js my-tweets\n" +
//             "    node liri.js spotify-this-song '<song_name>'\n" +
//             "    node liri.js movie-this '<movie_name>'\n" +
//             "    node liri.js do-what-it-says\n";

//         // Append the output to the log file
//         fs.appendFile("./log.txt", "LIRI Response:\n\n" + tweetMessage + "\n", (err) => {
//             if (err) throw err;
//             console.log(outputStr);
//         });
//     });
// }