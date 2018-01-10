
baseUrl = "http://localhost:8080/";


let displayDropdownProductions = (productions) => {
    let html = "";
    for (var i = 0; i < productions.length; i++) {
        var selectProductionId = productions[i]._id;
        html +=
            `<div class="dropdown">
              <button class="productionBtn" id="productionBtn" value="${selectProductionId}" data="${selectProductionId}"
              onclick="displayNotes('${selectProductionId}')">` +
            productions[i].productionName + `</button>
              <div class="dropdown-content">
                <a id="viewProductionNotes" onclick="displayNotes('${selectProductionId}')">View Production Notes</a>
                <a id="deleteProduction" onclick="handleDeleteProduction('${selectProductionId}')">Delete Production</a>
              </div>
               </div>`;
    }
    $('#productionList').html(html);
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
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].productionId === selectProductionId) {
                html +=
                    `
                    <div class="noteSnippet">
                    <i class="fa fa-times deleteNote" data="${notes[i]._id}" aria-hidden="false"></i>
                    <div data="${notes[i]._id}">
                    <input id="readToggle" type="checkbox" data="${notes[i]._id}" aria-hidden="true">Mark as read</input>
                    </div>
                    <p> To: ${notes[i].actor} </p> 
                    <p> ${notes[i].text} </p> 
                    </div>
                    `;
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

                for (var k = 0; k < productions[j].actors.length; k++) {
                    option += '<option>' + productions[j].actors[k] + '</option>';
                }
                $('#actor').append(option);
            }
        }
    });
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
    success: [displayDropdownProductions, msgFormProductionSelect]
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
        success: function (data) {
            $('#msgform').trigger("reset");
        },
        error: function (err) {
            alert(err.responseJSON.message);
        }
    }
    $.ajax(settings);
});

$(document).on("click", ".newProductionBtn", function () {
    console.log("click");
    let html = "";
    html += `<h1>Create A New Production</h1>
                <form id="newProduction">
                    <label for="productionName">Production Name</label><br>
                    <input type="text" id="productionName"><br>
                    <label for="actorName">Actor's Email</label><br>
                    <div class="addActorContainer">
                        <input type="text" id="actorName">
                        <button class="submit" type="button" id="addActor">Add Actor</button><br>
                    </div>
                    <button class="submit" type="submit">Submit</button>
                </form> `;

    $('.content').html(html);
});

let actors = [];

$(document).on("click", "#addActor", function () {
    event.preventDefault();
    let newActor = $("#actorName").val();
    $("#actorName").val("");
    actors.push(newActor);
    $("#actorName").before("<p style='color:gray; font-family:sans-serif;'>" + newActor + "<br></p>");
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
            location.alert("Your production, " + productionName + ", has successfully been created.");
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
    console.log(data);
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
