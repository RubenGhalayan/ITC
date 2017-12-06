app.directive("login", function() {
    return {
        template : "<form style='font-family: arial'>\
            <fieldset style='float: left'>\
            <legend>Login</legend>\
            <h4 style='margin-bottom: 7px'>Username</h4>\
            <input type='text' placeholder='Enter username...'>\
            <h4 style='margin-bottom: 7px'>Password</h4>\
            <input type='password' placeholder='Enter password...'>\
            <button style='display: block; margin-top: 20px'>Submit</button>\
            </fieldset>\
            </form>"
    };
});
