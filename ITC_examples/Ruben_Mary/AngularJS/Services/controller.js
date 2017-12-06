app.controller("serviceCtrl", function($scope, maxService, maxFactory, maxProvider) {
    $scope.maxServ = function(a, b) {
        return maxService.max(a, b); 
    };
    $scope.maxFact = function(a, b) {
        return maxFactory.max(a, b);
    };
    $scope.maxProv = function(a, b) {
        return maxProvider.max(a, b);
    };
});
