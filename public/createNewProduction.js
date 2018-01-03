let actors = [];

$("#addActor").click(e => {
    e.preventDefault();
    let newActor = $("#actorName").val();
    $("#actorName").val("");
    actors.push(newActor);
    $("#actorName").before("\n"+ newActor);
})

$("#newProduction").submit(e => {
    e.preventDefault();
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
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err);
        }
    }
    $.ajax(settings);
})
