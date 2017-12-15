$("#addActor").click(e => {
    e.preventDefault();
    let actorInput = `<input type="text" id="actorName"><br>`
    $("#actorName").after(actorInput);
})

$("#newProduction").submit(e => {
    e.preventDefault();
    let ProductiontName = $("#productionName").val();
    let actorName = $("#actorName").val();
    
    let settings = {
        url: "/productions/productions",
        type: "POST",
        contentType: "application/json",
        // modify to stringify array of actorNames
        // data: JSON.stringify(user),
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err.responseJSON.message);
        }
    }
    $.ajax(settings);
})
