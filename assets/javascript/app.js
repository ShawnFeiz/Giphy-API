$(document).ready(function() {

//array of strings that are each related to the topic: Food? Sports Teams? Date night destinations? 
var topics = ["tacos", "ice cream", "burger", "steak", "sandwich", "hot dogs", "lasagna", "pasta", "pizza", "chips", "sushi", "burrito", "chocolate", "cheese"];

//global variables
var img;
var state;

//create a for loop that creates buttons for each string in the topics array above
function generateButtons(){
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]).addClass("btn-lg btn-primary btn-custom").attr("data-person", topics[i]);
        $(".buttons").append(newButton);
        // console.log(newButton);
    };
};

function userButton() {
    $(".buttons").empty();
    var userFood = $(".food-input").val();
    topics.push(userFood);
    var userButton = $("<button>");
    userButton.text(userFood).addClass("btn-lg btn-primary btn-custom").attr("data-person", userFood);
    generateButtons();
    start();
};

function start(){
    $("button").on("click", function() {
        //clear div that holds img/gifs
        $(".appendImg").empty();

        //variable that holds the giphy url for AJAX call
        var food = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=BKJ0Dc300tsB4NvDkpGyZn4Hu2vjV2J9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"           
        }).done(function(response){

        var results = response.data;
        var foodDiv = $("<div>");
        
        // create a for loop that creates a div with img attribuite for each of the ten results
        for (var i = 0; i < results.length; i++) {
            //create img + attributes for every gif
            img = $("<img>");    
            img.attr("data-state", "still").addClass("gif").attr("src", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url); 
            
            //Grab the rating, set to a variable
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            //append the elements to each other & the page
            foodDiv.append(p);
            foodDiv.append(img);
            $(".appendImg").prepend(foodDiv);
            };
        });
    });
};


//===================================================================
//LETS BEGIN NOW 
//===================================================================

generateButtons();
start();

// $(".gif").on("click", function(){
$(".appendImg").on("click", ".gif", function(){
    state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        };
    });


//click event to add a new button. Needs "enter" functionality
$(".submitButton").on("click", function(event){
    userButton();
});

$('.food-input').keypress(function(e) {
    if(e.which == 13) { // Checks for the enter key
        e.preventDefault(); // Stops browser from triggering the button to be 
        userButton();
        $(".food-input").val(""); //clears input field
    }
});

});

