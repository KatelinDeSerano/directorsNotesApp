baseUrl = "http://localhost:8080";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (productions) => {
    
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        var actorproductionId = productions[i]._id;
        html += 
              `<button class="dropbtn" id="productionBtn" value="${actorproductionId}" data="${actorproductionId}"
              onclick="displayNotes('${actorproductionId}')">`+ 
              productions[i].productionName + `</button>`;  
    }
    $('#productionName').html(html);
};

function displayNotes(currentUser, actorproductionId){
    // notes need to be filtered by productionId and actor
    var request = $.ajax({
        url: baseUrl + "/notes",
        method: "GET",
        data: { user : currentUser},
        dataType: "json"
    });
    request.done(function (notes) {
        let html = "";
         for (var i=0; i < notes.length; i++) {
             console.log(user);
           if (notes[i].actor === user && notes[i].productionId === actorproductionId) {
            html += 
                  `<div class="noteSnippet">
                  <h3>"`+ notes[i].text + `" \n </h3></div>`;
            } else {
                notes[i]++;
            }
        }
        $('#notesDisplay').html(html);
    });
};

let displayError = (error) => {
    console.log("Error");
};

let token = localStorage.getItem("authToken");
let user = localStorage.getItem("currentUser");

$.ajax ({
    url: baseUrl + "/productions/actor/" + user,
    type: "GET",
    headers: { 
        Authorization: `Bearer ${token}` 
    },
    dataType: "json",
    success: displayProductions,
    error: displayError
  }); 