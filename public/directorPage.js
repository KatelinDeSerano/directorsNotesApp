
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
  url: baseUrl + "productions/" + user,
  type: "GET",
  dataType: "json",
  headers: {
    Authorization: `Bearer ${token}`
  },
  success: displayDropdownProductions
  // error: displayError
}); 

// add function to handle message submit button



