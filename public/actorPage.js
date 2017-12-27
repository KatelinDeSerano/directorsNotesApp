baseUrl = "http://localhost:8080";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (productions) => {
    
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        var selectProductionId = productions[i]._id;
        html += 
              `<button class="dropbtn" id="productionBtn" value="${selectProductionId}" data="${selectProductionId}"
              onclick="displayNotes('${selectProductionId}')">`+ 
              productions[i].productionName + `</button>`;  
    }
    $('#productionName').html(html);
};

function displayNotes(selectProductionId){
    let user = localStorage.getItem("currentUser");
    var request = $.ajax({
        url: baseUrl + "/notes",
        method: "GET",
        data: { actor : user,
                productionId : selectProductionId
        },
        contentType: "application/json"
    });
    request.done(function (notes) {
        let html = "";
        debugger
        for (var i=0; i < notes.length; i++) {
            if (notes[i].productionId === selectProductionId && notes[i].actor === user) {
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
