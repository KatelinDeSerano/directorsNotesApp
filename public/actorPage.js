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

// $("button").click(function() {
//     $.ajax({
//         url: "test.html",
//         context: document.body,
//         success: function(){
//           $(this).addClass("done");
//         }
//     });  
// });

function displayNotes(productionId){
   // console.log(productionId);
    var request = $.ajax({
        url: baseUrl + "/note",
        method: "GET",
        data: { id : productionId },
        dataType: "html"
    });
    request.done(function( msg ) {
       console.log(msg)
    });

    // let html = "";
    // // you need a get request here
    // for (var i = 0; i < notesArray.length; i++) {
    //     html += 
    //           `<h1>`+ notesArray[i]+ `</h1`;  
    // }
    // $('#notesDisplay').html(html);
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
 
// $.ajax ({
//     url: baseUrl + "/notes",
//     type: "GET",
//     dataType: "json",
//     success: displayNotes,
//     error: displayError
// });

