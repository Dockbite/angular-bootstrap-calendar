'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayRangeCtrl', function($scope, moment, calendarHelper, calendarEventTitle, $window) {

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

      vm.dateRange = [];
      var startDate = moment(vm.viewDateRangeStart);
      var stopDate = moment(vm.viewDateRangeEnd);
      while (startDate <= stopDate) {
        vm.dateRange.push(moment(startDate).format('YYYY-MM-DD'));
        startDate = moment(startDate).add(1, 'days');
      }

      var view = [];
      vm.nonAllDayEvents = [];
      vm.dateRange.forEach(function(day, index) {
        view[index] = calendarHelper.getDayView(
          vm.events,
          day,
          vm.dayViewStart,
          vm.dayViewEnd,
          vm.dayViewSplit,
          vm.dayViewEventWidth
        );
  
        vm.nonAllDayEvents[index] = view[index].events;
        vm.viewWidth = view[index].width + 62;
      });
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
        calendarNewResource: newResource ? newResource : 0,
        fromCalendar: true
      });
    };

    vm.eventDragged = function(event, minuteChunksMoved, resourceChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
      var document = typeof $window.document === 'undefined' ? '' : $window.document;
      document.getElementById('calendar').scrollLeft = document.getElementById('calendar').scrollLeft + resourceChunksMoved / 100;
    };

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
        calendarNewResource: event.resource ? event.resource : 0
      });
    };

    vm.eventResized = function(event, edge, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      if (edge === 'start') {
        event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
      }
    };

  })
  .directive('mwlCalendarDayRange', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarDayRangeView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        viewDateRangeStart: '=',
        viewDateRangeEnd: '=',
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
      controller: 'MwlCalendarDayRangeCtrl as vm',
      bindToController: true
    };

  });
