baseUrl = "http://localhost:8080";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (productions) => {
    
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        html += 
              `<button class="dropbtn" id="productionBtn" 
              onclick="displayNotes('${productions[i]._id}')">`+ 
              productions[i].productionName + `</button>`;  
    }
    $('#productionName').html(html);
};

function displayNotes(productionId){
   
    var request = $.ajax({
        url: baseUrl + "/notes",
        method: "GET",
        data: { id : productionId },
        dataType: "json"
    });
    request.done(function (notes) {
        let html = "";
         for (i in notes) {
           console.log( notes[i].text)
            html += 
                  `<div class="noteSnippet">
                  <h3>"`+ notes[i].text + `" \n </h3></div>`;  
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