
url = "http://localhost:9000/productions";



$.getJSON(url, function(data) {
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
    
});

function handleActorSelect(name) {
  console.log(name);
}

