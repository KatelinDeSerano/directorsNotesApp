
url = "http://localhost:9000/actor";
$.getJSON(url, function(data) {
  console.log(data.notes);
    let html = "";
    for (var i = 0; i < data.notes.length; i++) {
        // console.log(data.notes[i].productionName);
        console.log(data.notes[i].actorName);
     html += 
            `<div class="dropdown">
            <button class="dropbtn">`+ data.notes[i].productionName + `</button>
            <div class="dropdown-content">
              <a href="#">Actor 1</a>
              <a href="#">Actor 2</a>
              <a href="#">Actor 3</a>
            </div>
          </div>`
    }

    $('#productionName').html(html);
});