$("#signUp").submit(e => {
    e.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let user = {username, password};
    let settings = {
        url: "/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err);
        }
    }
    $.ajax(settings);
})


// add first name and last name field