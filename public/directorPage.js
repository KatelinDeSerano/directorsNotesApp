
baseUrl = "http://localhost:8080/";


let displayDropdownProductions = (productions) => {
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
        url: baseUrl + "notes",
        method: "GET",
        data: { 
                productionId : selectProductionId
        },
        contentType: "application/json"
    });
    request.done(function (notes) {
        let html = "";
        console.log(notes);
        for (var i=0; i < notes.length; i++) {
            if (notes[i].productionId === selectProductionId) {
                html += 
                    `<div class="noteSnippet">
                    <i class="fa fa-times deleteNote" data="${notes[i]._id}" aria-hidden="false"></i>
                    <div data="${notes[i]._id}">
                    <input id="readToggle" type="checkbox" data="${notes[i]._id}" aria-hidden="true">Mark as read</input>
                    </div>
                    <h3> ${notes[i].text} </h3> 
                    </div>`;
            } else {
                notes[i]++;
            }
        }
        $('.content').html(html);
    });
};


let msgFormProductionSelect = (productions) => {
    option = "";
    for (var i = 0; i < productions.length; i++) {
        option += '<option value="' + productions[i]._id + '">' + productions[i].productionName + '</option>';
    };
    $('#production').append(option);
    $('#production').on('change', function () {
        for (var j = 0; j < productions.length; j++) {
            if (productions[j]._id === this.value) {
                    var option = '';
                    $('#productionName').val(productions[j].productionName);
                    $("#actor option").remove();
                    console.log(productions[j].productionName);
                    
                for ( var k = 0; k <productions[j].actors.length; k++){     
                    option += '<option>' + productions[j].actors[k]+ '</option>';
                }
                $('#actor').append(option);
            }   
        }  
    });
};


let token = localStorage.getItem("authToken");
let user = localStorage.getItem("currentUser");


$.ajax ({
  url: baseUrl + "productions/director/" + user,
  type: "GET",
  dataType: "json",
  headers: {
    Authorization: `Bearer ${token}`
  },
  success:  [displayDropdownProductions, msgFormProductionSelect]
}); 

$("#msgform").submit(e => {
  e.preventDefault();
  let id = $("#production").val();
  let actor = $("#actor").val();
  let text = $("#msg").val();
  let production = $("#productionName").val();
  let director = localStorage.getItem("currentUser");
  let notes = {
      director: director,
      production: production,
      actor: actor,
      text: text,
      productionId: id,
      readStatus: false
  }


  const authToken = localStorage.getItem('authToken');
  let settings = {
      url: "/notes",
      type: "POST",
      contentType: "application/json",
      headers: { 
          Authorization: `Bearer ${authToken}` 
      },
      data: JSON.stringify(notes),
      success: function(data) {
          console.log(data);
          $('#msgform').trigger("reset"); 
      },
      error: function(err) {
        alert(err.responseJSON.message);
      }
  }
  $.ajax(settings);
});

