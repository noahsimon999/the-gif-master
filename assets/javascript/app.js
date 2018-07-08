$(document).ready(function () {

    // display list of gif buttons
    // display gifs when button is selected
    // display rating on each gif
    // when each gif is clicked play the gif, stop playing when clicked again
    // get user input from search
    // add new button to list of of button

    // display list of gif buttons
    var foods = ["pizza", "pasta", "pork", "ribs", "hamburgers", "hotdogs", "french fries"]
    renderButtons();

    function renderButtons() {
        $(".buttons").empty();
        for (var a = 0; a < foods.length; a++) {
            $(".buttons").append("<button>" + foods[a] + "</button>")
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

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userChoice + "&api_key=WbTEMDjbiX3J4qK6LNwGmIY5YXxfMuzq";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < 5; i++) {
                    $(".gifs").append("<img src='" + response.data[i].images.fixed_height_still.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-state='still' class='imgSize'>");
                    
                    $(".gifs").append("<p>" + response.data[i].rating + "</p>");
                   
                    $(".imgSize").on("click", function() {
                        var state = $(this).attr("data-state");
                        console.log(state);
                
                        if(state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                        }
                    })

                    var q = 1;
                }
                

                // $(".buttons button").click(function () {
                //     q += 1; 
                //     console.log(q);
                //     var g = q*3;
                //     console.log("two" + q);
                //     if(g < 25) {
                //         for (i; i < g ; i++) {
                //             console.log(i);
                //             $(".gifs").append("<img class='imgSize' src='" + response.data[i].images.fixed_height.url + "'>");
                //             $(".gifs").append("<p>" + response.data[i].rating + "</p>"); 
                //         }
                //     } else {
                //         return false;
                //     }
                // });

            });
        })
    }










});