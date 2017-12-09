$("#login").submit(e => {
    e.preventDefault();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let password = $("#password").val();
    let username = firstName + lastName;
    let user = {username, password};
    let settings = {
        url: "/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data) {
            console.log(data);
            localStorage.setItem("authToken", data.authToken)
        },
        error: function(err) {
            console.log(err.responseJSON.message);
        }
    }
    $.ajax(settings);
})
