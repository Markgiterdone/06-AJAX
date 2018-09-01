
$(document).ready(function(){

// Start with blank input var
var input = "";

// Initial button searh items to start    
    var displayedButtons = ["Superman", "Batman", "James Bond"];

// START OF FUNCTION TO DISPLAY IMAGE ....................
    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
 
      // Constructing a queryURL using the char e.g. character name and my key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=eDIEZEETYK0qItU3sYzlcQkfQ2FXJiw8&limit=10";

        // This is the ajax call to query information from the url
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            // Once data arrives it needs to be parsed into attributes for the number limit of the query
            for(var j = 0; j < limit; j++) {    
                // create a new div that will hold the query data
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                // need both still and animated images
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }
// CLOSE OF DISPLAY IMAGE FUNCTION .............................
    
// OPEN OF THE RENDER THE BUTTONS (starts with a few and then dynamically appends)
    function renderButtons(){ 

        // empty the id holding the buttons
        $("#display-buttons").empty();

        // Note - loop through creating buttons and adding their attributes
        for (var i = 0; i < displayedButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
    }
// CLOSE OF RENDER BUTTONS ..............................................


// OPEN THE CHANGE THE STILL TO ANIMATE AND BACK AGAIN  ...................
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
// CLOSE OF GIF CHANGING STATES .......................

// LISTEN EVENT: Code below prevents the ENTER key use ... you must use a mouse click
    $(window).keydown(function(event){
        if((event.keyCode == 13) && ($(event.target)[0]!=$("textarea")[0])) {
            event.preventDefault();
            return false;
        }
    });
// CLOSE OF LISTENING EVENT

// OPEN OF LISTENING EVENT - click SUBMIT BUTTON TO ADD A NEW GIF PULL BUTTON TOPIC
    $("#submitPress").on("click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        renderButtons();

        return false;
    })
// CLOSE OF CLICK SUBMIT BUTTON  ....

// A function call to render the buttons
    renderButtons();

// Two other listening events to triger display or toggle
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);

// Close of document ready div is below
});

// That is all folks!