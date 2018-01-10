$("#signUp").submit(e => {
    e.preventDefault();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let userType = $("input[name=role]:checked").val();
    let user = {firstName, lastName, email, password, userType};
    
    let settings = {
        url: "/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data) {
            alert("You have successfully been signed up!")
            window.location.replace("./login.html");
        },
        error: function(err) {
            alert(err.responseJSON.message);
        }
    }
    $.ajax(settings);
})








