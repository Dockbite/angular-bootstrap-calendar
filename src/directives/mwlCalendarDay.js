'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayCtrl', function($scope, moment, calendarHelper, calendarEventTitle) {

    var vm = this;

    vm.calendarEventTitle = calendarEventTitle;

    function refreshView() {

      vm.timeHidden = vm.dayViewTimePosition === 'hidden';
      vm.dayViewTimePositionOffset = vm.dayViewTimePosition !== 'default' ? 0 : 60;

      vm.dayViewSplit = vm.dayViewSplit || 30;
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        vm.dayViewStart,
        vm.dayViewEnd,
        vm.dayViewSplit
      );

      var view = calendarHelper.getDayView(
        vm.events,
        vm.viewDate,
        vm.dayViewStart,
        vm.dayViewEnd,
        vm.dayViewSplit,
        vm.dayViewEventWidth
      );

      vm.allDayEvents = view.allDayEvents;
      vm.nonAllDayEvents = view.events;
      vm.viewWidth = view.width + 62;

    }

    $scope.$on('calendar.refreshView', refreshView);

    $scope.$watchGroup([
      'vm.dayViewStart',
      'vm.dayViewEnd',
      'vm.dayViewSplit'
    ], refreshView);

    vm.eventDragComplete = function(event, minuteChunksMoved, resourceChunksMoved) {

      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      if (typeof vm.resources !== 'undefined') {
        if (typeof event.resource === 'undefined') {
          event.resource = 0;
        }
        var newResource = event.resource + Math.round(resourceChunksMoved);
        if (newResource < 0) {
          newResource = 0;
        } else if (newResource > vm.resources.length) {
          newResource = vm.resources.length - 1;
        }
      }

      var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
      var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
      delete event.tempStartsAt;

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null,
        calendarNewResource: newResource ? newResource : null
      });
    };

    vm.eventDragged = function(event, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
    };

    /*vm.eventDragged = function(event, minuteChunksMoved, resourceChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
      var document = typeof $window.document === 'undefined' ? '' : $window.document;
      document.getElementById('calendar').scrollLeft = document.getElementById('calendar').scrollLeft + resourceChunksMoved / 100;
    };*/

    vm.eventResizeComplete = function(event, edge, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      var start = moment(event.startsAt);
      var end = moment(event.endsAt);

      // set end if event.endsAt is undefined
      if (!event.endsAt) {
        end = moment(event.startsAt).add(30, 'minutes');
      }

      if (edge === 'start') {
        start.add(minutesDiff, 'minutes');
      } else {
        end.add(minutesDiff, 'minutes');
      }
      delete event.tempStartsAt;

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: start.toDate(),
        calendarNewEventEnd: end.toDate(),
        calendarNewResource: event.resource ? event.resource : null
      });
    };

    vm.eventResized = function(event, edge, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      if (edge === 'start') {
        event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
      }
    };

  })
  .directive('mwlCalendarDay', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarDayView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        onTimespanClick: '=',
        onDateRangeSelect: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        dayViewEventChunkSize: '=',
        dayViewEventWidth: '=',
        customTemplateUrls: '=?',
        cellModifier: '=',
        templateScope: '=',
        resources: '=',
        dayViewTimePosition: '=',
        draggableAutoScroll: '='
      },
      controller: 'MwlCalendarDayCtrl as vm',
      bindToController: true
    };

  });
