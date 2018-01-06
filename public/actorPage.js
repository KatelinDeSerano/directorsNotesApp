baseUrl = "http://localhost:8080";

// REMEMBER to SEPARATE CONCERNS
// do AJAX calls to 
let displayProductions = (productions) => {
    
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        var selectProductionId = productions[i]._id;
        html += 
              `<button class="productionBtn" id="productionBtn" value="${selectProductionId}" data="${selectProductionId}"
              onclick="displayNotes('${selectProductionId}')">`+ 
              productions[i].productionName + `</button>`;  
    }
    $('#productionList').html(html);
};

function displayNotes(selectProductionId){
    let user = localStorage.getItem("currentUser");
    var request = $.ajax({
        url: "/notes",
        method: "GET",
        data: { actor : user,
                productionId : selectProductionId
        },
        contentType: "application/json"
    });
    request.done(function (notes) {
        let html = "";
        
        for (var i=0; i < notes.length; i++) {
            if (notes[i].productionId === selectProductionId && notes[i].actor === user) {
                console.log(notes[i].readStatus);
                if (notes[i].readStatus === false){
                    html += 
                    `<div class="noteSnippet">
                    <i class="fa fa-times deleteNote" data="${notes[i]._id}" aria-hidden="false"></i>
                    <div data="${notes[i]._id}">
                    <span class="readNote" data="${notes[i]._id}"><i class="fa fa-square-o" aria-hidden="true" data="${notes[i]._id}"></i>&nbsp; Mark as read</span>
                    </div>
                    <p> ${notes[i].text} </p> 
                    </div>`;

                }else{
                    html += 
                    `<div class="noteSnippetRead">
                    <i class="fa fa-times deleteNote" data="${notes[i]._id}" aria-hidden="false"></i>
                    <div data="${notes[i]._id}">
                    <span class="readNote" data="${notes[i]._id}"><i class="fa fa-check-square-o" aria-hidden="true" data="${notes[i]._id}"></i>&nbsp; Mark as read</span>
                    </div>
                    <p> ${notes[i].text} </p> 
                    </div>`;
                }

            } else {
                notes[i]++;
            }
        }
        $('#notesDisplay').html(html);
    });
};

let displayError = (error) => {
    alert(err.responseJSON.message);
};

$(document).on("click",".deleteNote",function(){
    let item = $(this).attr("data");
    deleteNote(item);
    $(this).parent().remove();
})

function deleteNote(data){
    var request = $.ajax({
        url: "/notes/" + data,
        method: "DELETE",
        contentType: "application/json"
    });
    let displayError = (error) => {
        alert(err.responseJSON.message);
    };
};

$(document).on("click",".readNote",function(){
    let item = $(this).attr("data");
    readNote(item);
    $(this).parent().parent().attr("class","noteSnippetRead");
    $(this).find("i").attr("class","fa fa-check-square-o");
})

function readNote(data){
    console.log("update true")
    var request = $.ajax({
        url: "/notes/" + data,
        method: "PUT",
        contentType: "application/json"
    });
   
    let displayError = (error) => {
        alert(err.responseJSON.message);
    };
};

function readToggle(data){
    var request = $.ajax({
        url: "/notes/" + data,
        method: "PUT",
        contentType: "application/json"
    });
   
    let displayError = (error) => {
        alert(err.responseJSON.message);
    };
};

let token = localStorage.getItem("authToken");
let user = localStorage.getItem("currentUser");

$.ajax ({
    url: "/productions/actor/" + user,
    type: "GET",
    headers: { 
        Authorization: `Bearer ${token}` 
    },
    dataType: "json",
    success: displayProductions,
    error: displayError
  }); 


