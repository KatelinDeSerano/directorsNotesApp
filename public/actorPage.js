baseUrl = "http://localhost:9000";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (data) => {
    let html = "";
    for (var i = 0; i < data.productions.length; i++) {
        html += 
              `<button class="dropbtn" id="productionBtn" onclick="displayNotes('${data.productions[i].productionId}')">`+ data.productions[i].productionName + `</button>`;  
    }
    $('#productionName').html(html);
};

function displayNotes(productionId){
    var request = $.ajax({
        url: baseUrl + "/note",
        method: "GET",
        data: { id : productionId },
        dataType: "json"
    });
    request.done(function (notesArray) {
        let html = "";
         for (i in notesArray) {
           console.log( notesArray[i])
            html += 
                  `<div class="noteSnippet">
                  <h3>"`+ notesArray[i] + `" \n </h3></div>`;  
        }
        $('#notesDisplay').html(html);
    });
};

let displayError = (error) => {
    console.log("Error");
};

$.ajax ({
    url: baseUrl + "/productions",
    type: "GET",
    dataType: "json",
    success: displayProductions,
    error: displayError
  }); 