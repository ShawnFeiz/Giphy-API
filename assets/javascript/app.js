$(document).ready(function() {

//array of strings that are each related to the topic: Food? Sports Teams? Date night destinations? 
var topics = ["tacos", "burger", "steak", "sandwich"];

//create a for loop that creates buttons for each string in the topics array above
for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]).addClass("btn-lg btn-primary btn-custom").attr("data-person");
    $(".appendButtons").append(newButton);

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

    console.log(response);
    var results = response.data;
    var foodDiv = $("<div>");
    
    // create a for loop that creates a div with img attribuite for each of the ten results
    for (var i = 0; i < results.length; i++) {
        var img = $("<img>");  
        img.attr("src", results[i].images.fixed_height.url); 
        foodDiv.append(img);
        $(".appendImg").append(foodDiv);


    };

    


    });
});
});

