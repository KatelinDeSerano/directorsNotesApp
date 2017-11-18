
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
              <a href="#">` + (data.notes[i].actorName) + `</a>
              <a href="#">` + (data.notes[i].actorName) + `</a>
              <a href="#">` + (data.notes[i].actorName) + `</a>
            </div>
          </div>`
    }

    $('#productionName').html(html);
});