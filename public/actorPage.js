baseUrl = "http://localhost:9000";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (productions) => {
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        html += 
              `<div class="dropdown">
              <button class="dropbtn">`+ productions[i].productionName + `</button>
              <div class="dropdown-content">`;
    }
    $('#productionName').html(html);
};

let displayNotes = (notes) => {
    let html = "";
    for (var i = 0; i < data.notes.length; i++) {
    console.log(data.notes[i].text);
      html += 
            `<h4>`+ data.notes[i].text + `<h4>`;
    }
    $('#notesDisplay').html(html);
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