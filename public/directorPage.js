baseUrl = "http://localhost:8080/";

function personalize() {
    let name = localStorage.getItem("firstName");

    $("#name").html(name + "&#8217s Dashboard");
    $("#greeting").html("Welcome, " + name + "! <br> ");

};

personalize();

let userProductionsArray = [];

let setUserProductions = (productions) => {
    this.userProductionsArray = productions;
}

let displayDropdownProductions = (productions) => {

    let html = "";
    if (productions.length === 0) {
        html += `<h3>Looks like you have no productions created,  click the button above to create a new production</h3>`;
    } else {
        for (var i = 0; i < productions.length; i++) {
            var selectProductionId = productions[i]._id;
            var productionName = productions[i].productionName;

            html +=
                `<div class="dropdown">
              <button class="productionBtn" id="productionBtn" value="${selectProductionId}" data="${selectProductionId, productionName}"
              onclick="createNotes('${selectProductionId}','${productionName}')">` +
                productionName + `</button>
              <div class="dropdown-content">
                <a id="createNotes" onclick="createNotes('${selectProductionId}','${productionName}')">Create a New Note</a>
                <a id="viewProductionNotes" onclick="displayNotes('${selectProductionId}')">View Production Notes</a>
                <a id="deleteProduction" onclick="handleDeleteProduction('${selectProductionId}')">Delete Production</a>
                <a id="dashboard" href="./directorDashboard.html">Return to Dashboard</a>
              </div>
               </div>`;
        }
    }
    $('#productionList').html(html);
};

function createNotes(selectProductionId, productionName) {

    let html = "";
    html += `
    <div class="msgFormContainer">
    <form id="msgform">
      <h1>Notes for ` +
        productionName + `</h1>
      <label for="productionName">Select an Actor:</label>
      </br>
      <div class="selectContainer">
      <input type="text" id="productionName" value="${productionName}" hidden/>
      <select id="production"  style="display:none" required>
      <option>`+ selectProductionId + `</option>
    </select>
        <div class="selectItem">
          <select id="actor" autofocus required>
            <option>Choose an Actor</option>
          </select>
          </br>
        </div>
      </div>
      <div class="notesContainer">
        <label for="text">Note:</label>
        </br>
        <textarea id="msg" rows="8" cols="50" placeholder="type your note here..."></textarea>
        <br>
      </div>
      <button class="submit" type="submit" value="Submit">Submit</button>

    </form>
  </div>
</div>  `;

    $('.content').html(html);
    msgFormProductionSelect(selectProductionId);

};


function msgFormProductionSelect(selectProductionId) {
    console.log(this.userProductionsArray)

    let userProductions = this.userProductionsArray;
    for (var i = 0; i < userProductions.length; i++) {
        if (userProductions[i]._id === selectProductionId) {
            var option = '';
            for (var k = 0; k < userProductions[i].actors.length; k++) {
                option += '<option>' + userProductions[i].actors[k] + '</option>';
            }
            $('#actor').append(option);
        }
    }

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
            success: function (data) {
                alert("Note has been successfully sent.")
            },
            error: function (err) {
                alert(err.responseJSON.message);
            }
        }
        $('#msgform').trigger("reset");
        $.ajax(settings);
    });
};

function displayNotes(selectProductionId) {
    let user = localStorage.getItem("currentUser");
    var request = $.ajax({
        url: "notes",
        method: "GET",
        data: {
            productionId: selectProductionId
        },
        contentType: "application/json"
    });
    request.done(function (notes) {
        let html = "";
        html += `<div id="notesDisplay">`
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].productionId === selectProductionId) {
                if (notes[i].readStatus === false) {
                    html +=
                        `<div class="noteSnippet">
                    <div data="${notes[i]._id}">
                    <span class="readNote" data="${notes[i]._id}"><i class="fa fa-square-o" aria-hidden="true" data="${notes[i]._id}"></i>&nbsp; Mark as read</span>
                    </div>
                    <p> To: ${notes[i].actor} </p>
                    <p> ${notes[i].text} </p> 
                    </div>`;

                } else {
                    html +=
                        `<div class="noteSnippetRead">
                    <div data="${notes[i]._id}">
                    <span class="readNote" data="${notes[i]._id}"><i class="fa fa-check-square-o" aria-hidden="true" data="${notes[i]._id}"></i>&nbsp; Mark as read</span>
                    </div>
                    <p> To: ${notes[i].actor} </p>
                    <p> ${notes[i].text} </p> 
                    </div>`;
                }
            } else {
                notes[i]++;
            }

        }
        html += `</div>`
        $('.content').html(html);
    });
};

$(document).on("click", ".readNote", function () {
    let item = $(this).attr("data");
    readNote(item);
    $(this).parent().parent().attr("class", "noteSnippetRead");
    $(this).find("i").attr("class", "fa fa-check-square-o");
})

function readNote(data) {
    var request = $.ajax({
        url: "/notes/" + data,
        method: "PUT",
        contentType: "application/json"
    });

    let displayError = (error) => {
        alert(err.responseJSON.message);
    };
};

function readToggle(data) {
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

$.ajax({
    url: "/productions/director/" + user,
    type: "GET",
    dataType: "json",
    headers: {
        Authorization: `Bearer ${token}`
    },
    success: [displayDropdownProductions, setUserProductions]
});

let actors = [];

$(document).on("click", "#addActor", function () {
    event.preventDefault();
    let newActor = $("#actorName").val();
    $("#actorName").val("");
    actors.push(newActor);
    $("#actorName").before("<p style='font-family:sans-serif;'>" + newActor + "<br></p>");
})

$(document).on("submit", "#newProduction", function () {
    event.preventDefault();
    let productionName = $("#productionName").val();
    let director = localStorage.getItem("currentUser");
    let production = {
        director: director,
        productionName: productionName,
        actors: actors
    }
    const authToken = localStorage.getItem('authToken');
    let settings = {
        url: "/productions",
        type: "POST",
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data: JSON.stringify(production),
        success: function (data) {
            alert("Your production, " + productionName + ", has successfully been created.");
            location.reload();
        },
        error: function (err) {
            alert(err.responseJSON.message);
        }
    }
    $.ajax(settings);
});

$(document).on("click", ".deleteNote", function () {
    let item = $(this).attr("data");
    deleteNote(item);
    $(this).parent().remove();
});

function deleteNote(data) {
    const authToken = localStorage.getItem('authToken');
    var request = $.ajax({
        url: "/notes/" + data,
        method: "DELETE",
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    let displayError = (error) => {
        alert(err.responseJSON.message);
    };
};

function handleDeleteProduction(data) {
    let confirmDelete = confirm("Are you sure you want to delete this production?  All records will be lost.");
    if (confirmDelete === true) {
        const authToken = localStorage.getItem('authToken');
        let settings = {
            url: "productions/" + data,
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            success: function (data) {
                location.reload(true);
            },
            error: function (err) {
                alert(err.responseJSON.message);
            }
        }
        $.ajax(settings);
    } else {
        alert("Delete cancelled.");
    }
};

$(document).on("click", "#logout", function () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    window.location.replace("./index.html");
});
