
url = "http://localhost:9000/productions";
$.getJSON(url, function(data) {
  console.log(data.productions);
    let html = "";
    for (var i = 0; i < data.productions.length; i++) {
        // console.log(data.notes[i].productionName);
        console.log(data.productions[i].actorName);
      html += 
            `<div class="dropdown">
            <button class="dropbtn">`+ data.productions[i].productionName + `</button>
            <div class="dropdown-content">`
        
      for (var j = 0; j < data.productions[i].actors.length; j++) {
        html += `<a href="#"> ${data.productions[i].actors[j]} </a>`
      }
      html += `     
            </div>
          </div>`
    }

    $('#productionName').html(html);
});