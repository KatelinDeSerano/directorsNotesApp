$("#login").submit(e => {
    e.preventDefault();

    let username = $("#email").val();
    let password = $("#password").val();
    let user = {username, password};
    let settings = {
        url: "/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data) {
            localStorage.setItem("authToken", data.authToken);
            localStorage.setItem("currentUser", username);
            localStorage.setItem("userType", data.userType);
            localStorage.setItem("firstName", data.firstName);
            
            if (data.userType === "director") {

                window.location.replace("./directorDashboard.html");      
            }  else if (data.userType === "actor") {

                window.location.replace("./actorDashboard.html");
            }
        },
        error: function(err) {
            if(err.status === 401){
                alert("Username or Password is incorrect");
            } 
        }
    }
    $.ajax(settings);
})
