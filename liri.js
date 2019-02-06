require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyAPI);
var moment = require("moment");
var fs = require("fs");

switch (process.argv[2]) {
    case "concert-this":
        var input = process.argv[3];
        var bandInput = input.split(" ");
        var artist = bandInput.join("+");
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    var locationDate = response.data[0].datetime;
                    locationDate = locationDate.substring(0, 10);
                    var formattedDate = moment(locationDate).format("MM/DD/YYYY");
                }
                console.log(process.argv[3] + "'s next concert:");
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date of event: " + formattedDate);
            }
        )
        break;
    case "spotify-this-song":
        var input = process.argv[3];
        var newInput = input.split(" ");
        var finalInput = newInput.join("+");
        spotify.search({
            type: "track",
            query: input,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            } else {
                for (i = 0; i < data.tracks.items.length; i++) {
                    console.log("The artist is: " + data.tracks.items[0].artists[0].name);
                    console.log("The name of the song is: " + data.tracks.items[0].name);
                    console.log("This is a link to the song: " + data.tracks.items[0].external_urls.spotify);
                    console.log("It is from the album: " + data.tracks.items[0].album.name);
                }
            }
        });
        break;
    case "movie-this":
        var input = process.argv[3];
        var newInput = input.split(" ");
        var finalInput = newInput.join("+");
        axios.get("http://www.omdbapi.com/?t=" + finalInput + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot (shortened): " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                var dataArr = data.split(",");
                var input = dataArr[1];
                var newInput = input.split(" ");
                var finalInput = newInput.join("+");
                var bandInput = input.split(" ");
                var artist = bandInput.join("+");
                switch (dataArr[0]) {
                    case "concert-this":
                        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
                            function (response) {
                                for (i = 0; i < response.data.length; i++) {
                                    var locationDate = response.data[0].datetime;
                                    locationDate = locationDate.substring(0, 10);
                                    var formattedDate = moment(locationDate).format("MM/DD/YYYY");
                                }
                                console.log("Venue: " + response.data[0].venue.name);
                                console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                                console.log("Date of event: " + formattedDate);
                            }
                        )
                        break;
                    case "spotify-this-song":
                        spotify.search({
                            type: "track",
                            query: input,
                            limit: 1
                        }, function (err, data) {
                            if (err) {
                                return console.log("Error occured: " + err);
                            } else {
                                for (i = 0; i < data.tracks.items.length; i++) {
                                    console.log("The artist is: " + data.tracks.items[0].artists[0].name);
                                    console.log("The name of the song is: " + data.tracks.items[0].name);
                                    console.log("This is a link to the song: " + data.tracks.items[0].external_urls.spotify);
                                    console.log("It is from the album: " + data.tracks.items[0].album.name);
                                }
                            }
                        });
                        break;
                    case "movie-this":
                        axios.get("http://www.omdbapi.com/?t=" + finalInput + "&y=&plot=short&apikey=trilogy").then(
                            function (response) {
                                console.log("Title: " + response.data.Title);
                                console.log("Year released: " + response.data.Year);
                                console.log("IMDB Rating: " + response.data.imdbRating);
                                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                                console.log("Country produced: " + response.data.Country);
                                console.log("Language: " + response.data.Language);
                                console.log("Plot (shortened): " + response.data.Plot);
                                console.log("Actors: " + response.data.Actors);
                            }
                        )
                        break;
                }
            }
        });
        break;
    default:
        console.log("That is not an acceptable request.");
        break;
};