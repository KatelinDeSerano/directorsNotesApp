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

// let displayNotes = (data) => {
//     let html = "";
//     for (var i = 0; i < data.notes.length; i++) {
//       html += 
//             `<h4>`+ data.notes[i].text + `<h4>`;
//     }
//     $('#notesDisplay').html(html);
// };

// function handleProductionSelect(productionName) {
//     if ()
//     $("notesDisplay").text();
//   };

$("button").click(function() {
    $.ajax ({
        url: baseUrl + "/note?id="+productionId,
        type: "GET",
        dataType: "json",
        success: displayNotes,
        error: displayError
    });    
});

function displayNotes(productionId){
    console.log(productionId);
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
 
$.ajax ({
    url: baseUrl + "/notes",
    type: "GET",
    dataType: "json",
    success: displayNotes,
    error: displayError
});

