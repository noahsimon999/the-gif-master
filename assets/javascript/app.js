$(document).ready(function () {

// display list of gif buttons
// display gifs when button is selected
// display rating on each gif
// when each gif is clicked play the gif, stop playing when clicked again
// get user input from search
// add new button to list of of button

// display list of gif buttons
var foods = ["pizza", "pasta", "pork", "ribs", "hamburgers", "hotdogs", "french fries"]
var a = 0;
renderButtons();

function renderButtons() {
    for(a; a < foods.length; a++) {
        $(".buttons").append("<button>" + foods[a] + "</button>")
        GIFMechanics();
    }
}


// add more foods to the array
$("#add-food").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var moreFood = $("#food-input").val().trim();

    // Adding the movie from the textbox to our array
    foods.push(moreFood);
    renderButtons();
    a = foods.length;
  });


// listens for a button click and then returns gifs
function GIFMechanics() {
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
            $(".gifs").append("<img src='" + response.data[i].images.fixed_height.url + "'>");
            $(".gifs").append("<p>" + response.data[i].rating+ "</p>");
        }
    });
})
}










});