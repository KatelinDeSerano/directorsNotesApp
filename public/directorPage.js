
baseUrl = "http://localhost:8080/";



let displayDropdownProductions = (productions) => {
    let html = "";
    for (var i = 0; i < productions.length; i++) {
      html += 
            `<div class="dropdown">
            <button class="dropbtn">`+ productions[i].productionName + `</button>
            <div class="dropdown-content">`;
        
      for (var j = 0; j < productions[i].actors.length; j++) {
        var selectActor = productions[i].actors[j];
        var selectProduction = productions[i].productionName;
        html += `<a id="actorList" onclick="handleActorSelect('${selectActor}', '${selectProduction}')">${selectActor}</a>`;
      }
      html += `</div>
               </div>`;
    }

    $('#productionName').html(html);
    
};

function handleActorSelect(name, production) {
  $("#actor").val(name);
  $("#production").val(production);
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
  success: displayDropdownProductions
  // error: displayError
}); 
console.log("test");
// TODO: add function to handle message submit button
$("#msgform").submit(e => {
  e.preventDefault();
  debugger
  let production = $("#production").val();
  let actor = $("#actor").val();
  let text = $("#msg").val();
  let director = localStorage.getItem("currentUser");
  let notes = {
      director: director,
      production: production,
      actor: actor,
      text: text
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
      },
      error: function(err) {
          console.log(err);
      }
  }
  $.ajax(settings);
})

