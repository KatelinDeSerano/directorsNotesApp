
baseUrl = "http://localhost:9000/";



let displayDropdownProductions = (data) => {
    let html = "";
    for (var i = 0; i < data.productions.length; i++) {
      html += 
            `<div class="dropdown">
            <button class="dropbtn">`+ data.productions[i].productionName + `</button>
            <div class="dropdown-content">`;
        
      for (var j = 0; j < data.productions[i].actors.length; j++) {
        var selectActor = data.productions[i].actors[j];
        html += `<a id="actorList" onclick="handleActorSelect('${selectActor}')">${selectActor}</a>`;
      }
      html += `</div>
               </div>`;
    }

    $('#productionName').html(html);
    
};

function handleActorSelect(name) {
  $("textarea").text("To " + name);
};

$.ajax ({
  url: baseUrl + "productions",
  type: "GET",
  dataType: "json",
  success: displayDropdownProductions,
  // error: displayError
}); 

// add function to handle message submit button



