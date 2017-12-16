$("#signUp").submit(e => {
    e.preventDefault();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let userType = $("input[name=role]:checked").val();
    let user = {firstName, lastName, username, password, userType};
    console.log(userType);
    
    let settings = {
        url: "/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err.responseJSON.message);
        }
    }
    $.ajax(settings);
})








