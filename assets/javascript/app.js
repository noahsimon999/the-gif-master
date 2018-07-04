$(document).ready(function () {

// display list of gif buttons
// display gifs when button is selected
// display rating on each gif
// when each gif is clicked play the gif, stop playing when clicked again
// get user input from search
// add new button to list of of button

// display list of gif buttons
var foods = ["pizza", "pasta", "pork", "ribs", "hamburgers", "hotdogs", "french fries"]
for(var i = 0; i < foods.length; i++) {
    $(".buttons").append("<button>" + foods[i] + "</button>")
}

var userChoice = foods[0];
$(".buttons button").click(function() {
    userChoice = $(this).text();
    console.log(userChoice);
    $(".gifs").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userChoice + "&api_key=WbTEMDjbiX3J4qK6LNwGmIY5YXxfMuzq";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for(var i = 0; i < 11; i++) {
            $(".gifs").append("<img src='" + response.data[i].images.fixed_height.url+ "'>")
        }
      });


})












});