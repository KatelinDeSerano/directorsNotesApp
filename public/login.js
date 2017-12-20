$("#login").submit(e => {
    e.preventDefault();

    let username = $("#username").val();
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
            
            if (data.userType === "director") {
                window.location.replace("./directorDashboard.html");
                    
                 
            }  else if(data.userType === "actor"){
                window.location.replace("./actorDashboard.html");
            }
        },
        // conditional statement--if a userType is "actor"
        // route to actor dashboard
        // if userType is director
        // route to director dashboard
        error: function(err) {
            console.log(err);
        }
    }
    $.ajax(settings);
})
