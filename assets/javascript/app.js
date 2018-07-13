$(document).ready(function () {
    // display list of gif buttons
    var foods = ["pizza", "pasta", "pork", "ribs", "hamburgers", "hotdogs", "french fries", "bread", "apples", "potatoes", "barbecue", "bear claw", "beef", "steak", "burrito", "buffalo wings", "Cajun cuisine", "butter cookie", "cheese", "cheese steak", "chili", "chicken", "chili dog", "chimichanga", "chicken fried steak", "queso", "chips and dip", "dark chocolate", "white chocolate", "milk chocolate", "chocolate chip cookies", "chowder", "coleslaw", "corn dog", "corned beef"]
    renderButtons();

    function renderButtons() {
        $(".buttons").empty();
        for (var a = 0; a < foods.length; a++) {
            $(".buttons").prepend("<button class='foods'>" + foods[a] + "</button>")
        }
        GIFMechanics();
    }

    // add more foods to the array
    $("#add-food").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var moreFood = $("#food-input").val().trim();

        // Adding the movie from the textbox to our array
        if (moreFood == "") {
            return false; // added so user cannot add a blank button
        } else {
            foods.push(moreFood);
            renderButtons();
            a = foods.length;
            document.forms['food-form'].reset()
        }
    });

    // listens for a button click and then returns gifs
    function GIFMechanics() {
        var userChoice;
        $(".buttons button").click(function () {
            userChoice = $(this).text();
            console.log(userChoice);
            $(".gifs").empty();

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userChoice + "&api_key=WbTEMDjbiX3J4qK6LNwGmIY5YXxfMuzq";

            // calls the giphy api and renders gifs
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < 25; i++) {
                    $(".gifs").append("<img src='" + response.data[i].images.fixed_height.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-state='animate' class='imgSize'>");
                    $(".gifs").append("<p class='rating'>Rating: " + response.data[i].rating + "</p>");
                }

                // pauses and plays buttons
                $(".imgSize").on("click", function() {
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if(state === "animate") {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                    if(state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } 
                    
                })
            });
        })
    }










});