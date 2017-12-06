app.service("maxService", function() {
    this.max = function(a, b) {
        return (a > b) ? a : b;
    } 
});

app.factory("maxFactory", function() {
    return  { 
        max: function(a, b) {
            return (a > b) ? a : b;
        }
    };
});

app.provider("maxProvider", function() {
    this.$get = function() {
        return {
            max: function(a, b) {   
                return (a > b) ? a : b;
            } 
        };
    };
});
