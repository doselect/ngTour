angular.module('ngTourDemo', ['ngTour'])
  .controller('ngTourCtrl', ['$scope', 'ngTour', function($scope, ngTour) {
    $scope.start = function() {
      ngTour.start({
        parent: document.body
      })
    }
  }])
