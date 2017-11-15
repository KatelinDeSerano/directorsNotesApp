url = "http://localhost:9000/actor"
$.getJSON(url, function(MOCK_NOTES) {
  console.log(MOCK_NOTES)
    var option = '';
    for (var i = 0; i < notes.length; i++) {
        option += '<option value="' + notes[i].productionName + '">' + notes[i].productionName + '</option>';
    }
    $('#productionName').append(option);
});