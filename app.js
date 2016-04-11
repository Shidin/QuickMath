(function(){
    var app=angular.module("gameApp",['ngSanitize','ngRoute']);
    
    app.config(function($routeProvider) {
        $routeProvider.when("/main",
        {
            templateUrl: "mainScreen.html",
            controller:"quickMathController"
        })
        .otherwise({redirectTo:"/main"});
    });
}());