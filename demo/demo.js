angular.module('ngTourDemo', ['ngTour'])
  .controller('ngTourCtrl', ['$scope', 'ngTour', function($scope, ngTour){
    $scope.test = 'test'
    ngTour.start({
      parent: document.body,
      steps: [
        {'id': 'card1', 'text': 'This is Card 1.'},
        {'id': 'card3', 'text': 'This is Card 3.'},
        {'id': 'card2', 'text': 'This is Card 2.'},
        {'id': 'card4', 'text': 'This is Card 4.'}
      ]
    })
  }])
