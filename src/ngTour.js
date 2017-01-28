'use strict';

angular.module('ngTour', [])
  .factory('ngTour', [function(){

    var createBackdrop = function (container) {
      /*
        Takes a container and creates a full-screen backdrop against it.
      */
      container = angular.element(container)

      var backdrop = angular.element('<div class="ng-tour-backdrop"></div>')
      container.prepend(backdrop)
      console.log(container)
    }

    return {
      start: function (conf) {
        console.info('Starting tour...')

        // get the tour container parent element. If no parent is passed, then set
        // the parent element to be the current document's body
        var containerParent = conf.parent || document.body

        // create the base backdrop for the container
        var backdrop = createBackdrop(containerParent)
      }
    }
  }])
