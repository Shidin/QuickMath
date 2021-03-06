(function(){

var gameApp=angular.module("gameApp");

var quickMathController=function($scope, $interval, $route, $window){
    
    //Generate a random number
    var generateNumber=function(){
        console.log("generateNumber");
        $scope.randomNumber=_.random(1,10);
        generatedNumbers.push($scope.randomNumber);
        console.log(generatedNumbers);
        $scope.counter=3;
    };
    
    //Start the game
    $scope.startGame=function(){
        $scope.userInputOpen=true;
        console.log("$scope.userInputOpen");
        $scope.userSum=null;
        $scope.score=0;
        $scope.gameStarted=true;
        generateNumber();
        //Start the Countdown
        startCounter();
    };
    
    //Start the counter
    var startCounter = function() { 
        console.log("startCounter");
        counterInterval = $interval(decrementTimer, 1000);
    };
    
    //Decrement the Timer
    var decrementTimer=function(){
        console.log("decrementTimer");
        console.log($scope.counter);
        $scope.counter -= 1;
        //When timer hits 0, generate a random number
        if ($scope.counter === 0) {
         $scope.validateResult();
      }
    };
    
    //Validate the result 
    $scope.validateResult=function(){
        console.log("$scope.validateResult");
            console.log($scope.userSum);
        if($scope.userSum!=_.sum(generatedNumbers)){
            endGame();
        } else{
            $scope.score+=1;
            $scope.userSum=null;
            generateNumber();
        }
    }; 
    
    //End Game
    var endGame=function(){
        console.log("endGame");
        //Cancel the Counter
        if (counterInterval) {
        $interval.cancel(counterInterval);
        };
        if($scope.userSum===null){
        $scope.wrongSum="Uh-oh, Your time is up!";
        } else{
           $scope.wrongSum="Uh-oh, wrong answer!"; 
        }
        $scope.message="Number(s) Generated:"+generatedNumbers+
         "<br/> Expected result: "+_.sum(generatedNumbers)+
         "<br/><b><font color=\"purple\">Thanks for playing!!</font>";
    };
    
    $scope.test=function(){
        alert(123);
    };
    
    
    $scope.reloadRoute = function() {
        //$route.reload();
        $window.location.reload(true)
    };

    $scope.gameStarted=false;
    var generatedNumbers=[];
    $scope.userInputOpen = false
};

//Custom Directive to bring the focus onto the result box
gameApp.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element[0].focus();
        });
      },true);
  };    
});

//Register the Controller
gameApp.controller("quickMathController", quickMathController);
    
}());   
