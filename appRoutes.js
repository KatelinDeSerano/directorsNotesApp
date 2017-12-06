



var router = function() {
    function displayNotes(data) {
        for (index in data.notes) {
            $('body').append(
                '<p>' + data.statusUpdates[index].text + '</p>');
        }
    }
};

function getAndDisplayActorNotes() {
    getActorNotes(displayNotes);
}

module.exports = router;