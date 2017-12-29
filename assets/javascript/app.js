$(document).ready(function() {

//array of strings that are each related to the topic: Food? Sports Teams? Date night destinations? 
var topics = ["tacos", "ice cream", "burger", "steak", "sandwich", "hot dogs", "lasagna", "pasta"];

//global variables
var img;
var state;

//create a for loop that creates buttons for each string in the topics array above
for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]).addClass("btn-lg btn-primary btn-custom").attr("data-person", topics[i]);
    $(".buttons").append(newButton);
    console.log(newButton);
};


    function userButton() {
        var newFood = $(".food-input").val();
        topics.push(newFood);
        var newButton1 = $("<button>");
        newButton1.text(newFood).addClass("btn-lg btn-primary btn-custom").attr("data-person", newFood);
        $(".buttons").append(newButton1);
        console.log(topics);
    };


//===================================================================
//===================================================================


    $("button").on("click", function() {
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
            img.attr("data-state", "still").addClass("gif"); 
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            
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


$(".submitButton").on("click", function(){
    userButton();
});


});

