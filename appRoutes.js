var express = require('express');

var appRoutes = express.Router();

var MOCK_NOTES = {
    "notes": [
        {
            "id": "111111",
            "text": "You suck, do better",
            "authorId": "a1a1a1",
            "authorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"123456",
            "productionName": "Harvey",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "222222",
            "text": "learn to sing",
            "authorId": "b2b2b2",
            "authorName": "Paul Finocchiaro",
            "actorId": "bbbbbb",
            "actorName": "Taylor Swift",
            "productionId":"654321",
            "productionName": "Miss Siagon",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "333333",
            "text": "be aware of where you are putting your cigarette",
            "authorId": "a1a1a1",
            "authorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"123456",
            "productionName": "Harvey",
            "publishedAt": 147001697669,
            "readStatus": true
        }
    ]
};

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