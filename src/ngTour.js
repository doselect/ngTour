'use strict';

angular.module('ngTour', [])
  .factory('ngTour', ['$rootScope', function($rootScope) {

    $rootScope.ngTour = {
      nextButtonText: 'Next'
    }

    var endTour = function() {
      $rootScope.ngTour.backdrop.remove()
      $rootScope.ngTour = {
        nextButtonText: 'Next'
      }
    }

    var createBackdrop = function(container) {
      /*
        Takes a container and creates a full-screen backdrop against it.
      */
      container = angular.element(container)
      $rootScope.ngTour.backdrop = angular.element('<div id="ngTour"><div class="ngTour-overlay"><div class="ngTour-cover"><div class="ngTour-side"></div><div class="ngTour-side"></div><div class="ngTour-side"></div><div class="ngTour-side"></div></div></div><div class="ngTour-content"><div class="ngTour-content-inner"><p></p><button>Next</button></div></div></div>')
      container.prepend($rootScope.ngTour.backdrop)
      $rootScope.ngTour.struct = {
        overlay: document.querySelector('.ngTour-overlay'),
        content: document.querySelector('.ngTour-content'),
        helper: document.querySelector('.ngTour-content > .ngTour-content-inner > p'),
        nextButton: document.querySelector('.ngTour-content > .ngTour-content-inner > button'),
        cover: document.querySelector('.ngTour-cover')
      }
    }

    var drawMilestone = function(index) {
      var milestone = $rootScope.ngTour.milestones[index]

      $rootScope.ngTour.currentMilestoneIdx = index
      if ($rootScope.ngTour.currentMilestoneIdx === $rootScope.ngTour.milestones.length - 1) {
        $rootScope.ngTour.struct.nextButton.innerText = 'Finish'
      }

      var helper = milestone.getAttribute('data-tour-helper')
      var b = milestone.offsetHeight / 2
      var c = milestone.offsetWidth / 2
      var a = a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(0.5 * Math.PI));
      var data = {
        top: milestone.offsetTop - window.scrollY + b + 'px',
        left: milestone.offsetLeft - window.scrollX + c + 'px',
        size: a * 2
      }

      var struct = $rootScope.ngTour.struct
      struct.overlay.style.width = 0;
      struct.overlay.style.height = 0;
      // struct.overlay.style.boxShadow = '0 0 0 ' + 100 * Math.sqrt(2) + 'vmax hsla(' + index * 20 + ',80%,40%,0.9)';
      struct.overlay.style.boxShadow = '0 0 0 ' + 100 * Math.sqrt(2) + 'vmax rgba(16, 17, 48, 0.9)';
      struct.helper.innerText = '';
      struct.nextButton.style.visibility = 'hidden'

      setTimeout(function() {
        struct.helper.innerText = helper;
        struct.nextButton.style.visibility = 'visible'
        struct.cover.style.height = b * 2 + 'px';
        struct.cover.style.width = c * 2 + 'px';
        struct.overlay.style.top = data.top;
        struct.overlay.style.left = data.left;
        struct.overlay.style.width = data.size + 'px';
        struct.overlay.style.height = data.size + 'px';
      }, 500)

      if (parseInt(data.left, 10) > window.innerWidth / 2) {
        struct.content.style.left = '0%';
      } else {
        struct.content.style.left = '50%';
      }
    }

    var nextMilestone = function() {
      if ($rootScope.ngTour.currentMilestoneIdx === $rootScope.ngTour.milestones.length - 1) {
        endTour()
      } else {
        drawMilestone($rootScope.ngTour.currentMilestoneIdx + 1)
      }
    }

    return {
      start: function(conf) {
        // get the tour container parent element. If no parent is passed, then set
        // the parent element to be the current document's body
        var containerParent = conf.parent || document.body

        // create the base backdrop for the container
        var backdrop = createBackdrop(containerParent)

        var steps = document.querySelectorAll('[data-tour]')

        if (steps.length === 0) {
          return
        }

        var milestonesArr = []
        var milestonesMap = {}

        angular.forEach(steps, function(step) {
          var id = step.getAttribute('data-tour')
          milestonesArr.push(id)
          milestonesMap[id] = step
        })

        milestonesArr.sort(function(a, b) {
          return a - b
        })

        $rootScope.ngTour.milestones = milestonesArr.map(function(item, index) {
          return milestonesMap[item]
        })

        // start the tour
        setTimeout(function() {
          drawMilestone(0)
          $rootScope.ngTour.struct.nextButton.addEventListener('click', nextMilestone)
        })

      }
    }
  }])
