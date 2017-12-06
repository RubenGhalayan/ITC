app.directive("login", function() {
    return {
        template : "<form style='font-family: arial'>\
            <fieldset style='float: left'>\
            <legend>Login</legend>\
            <h4 style='margin-bottom: 7px'>Username</h4>\
            <input type='text' ng-value='user' placeholder='Enter username...'>\
            <h4 style='margin-bottom: 7px'>Password</h4>\
            <input type='password' ng-value='pass' placeholder='Enter password...'>\
            <button style='display: block; margin-top: 20px'>Submit</button>\
            </fieldset>\
            </form>"
    };
});

app.controller("myCtrl", function($scope, login) {   
    $scope.user = login.username;
    $scope.pass = login.password;
});
