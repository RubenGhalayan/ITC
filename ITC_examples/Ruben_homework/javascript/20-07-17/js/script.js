
var app = angular.module("ints-itc8", ['ngTable']);
 app.controller('studentsCtrl', function ($scope) {
            $scope.data = [
                        {"name":"Vachagan","age":"20","score":"5"},
                        {"name":"Smbat","age":"30","score":"7"},
                        {"name":"Liana","age":"22","score":"8"},
                        {"name":"Mary","age":"20","score":"7"},
                        {"name":"Ruben","age":"17","score":"7"},
                    ];
        });


app.directive("top", function() {
    return {
        template : '<nav class="top">\
                        <div class="container-fluid">\
                            <ul class="nav navbar-nav">\
                            <li><a href="index1.html">Page 1</a></li>\
                            <li><a href="index2.html">Page 2</a></li>\
                            </ul>\
                        </div>\
                    </nav>'
    };
});

app.directive("bottom", function() {
    return {
        template : '<div class="bottom">\
                        <span >ITC8</span>\
                    </div>'
    };
});

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

app.directive("students", function() {
    return {
        template : '<div ng-controller="studentsCtrl">\
                        <table ng-table="usersTable"  class="table table-striped">\
                            <tr ng-repeat="user in data">\
                                <td data-title="\'Name\'" >\
                                    {{user.name}}\
                                </td>\
                                <td data-title="\'Age\'" >\
                                    {{user.age}}\
                                </td>   \
                                <td data-title="\'Score\'" >\
                                    {{user.score}}\
                                </td>    \
                            </tr>\
                            </table>\
                    </div>'
    };
});
app.directive("students2", function() {
    return {
        template : '<div ng-controller="studentsCtrl">\
                        <table ng-table="users" class="table table-striped">\
                            <tr ng-repeat="user in data">\
                                <td data-title="\'Name\'" >\
                                    {{user.name}}\
                                </td>\
                                <td data-title="\'Age\'" >\
                                    {{user.age}}\
                                </td>   \
                                <td data-title="\'Score\'" >\
                                    {{user.score}}\
                                </td>    \
                            </tr>\
                            </table>\
                    </div>'
    };
});
