angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment, calendarConfig, $scope) {

    var vm = this;

    vm.res = [];
    vm.res[0] = vm.res[1] = vm.res[2] = vm.res[3] = true;

    vm.resources = [
      {
      id: 1,
      serviceman: 1441,
      label: 'serviceman1'
      },
      {
      id: 2,
      serviceman: 1442,
      label: 'serviceman2'
      },
      {
      id: 3,
      serviceman: 1443,
      label: 'serviceman3'
      },

    ];

    vm.forceupdate = function() {
      $scope.$broadcast('calendar.refreshView');
      // $scope.$apply();
    }

    // vm.updateResources = function() {
    //   // vm.resources = [];
    //   while(vm.resources.length > 0) {
    //     vm.resources.pop();
    //   }

    //   var i = 0;
    //   for(idx in vm.res) {
    //     if(vm.res[idx] == true) {
    //       vm.resources.push({id: i, serviceman: 144+idx, label: 'servicemen' + idx});
    //       i++;
    //     }
    //   }

    //   console.log(2, vm.resources);
    //   $scope.$broadcast('calendar.refreshView');
    //   // setTimeout(function() {$scope.$broadcast('calendar.refreshView');}, 1);
    // }

    // vm.eventDroppedInList = function(event) {
    //   var internalIndex = vm.events.indexOf(event);
    //   if (internalIndex > -1) {
    //     vm.events.splice(internalIndex, 1);
    //     vm.externalEvents.push(event);
    //   }
    // }

    vm.events = [
      {
        title: 'Draggable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resource: 2
      },
      {
        title: 'Draggable event 2',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').add(2, 'days').toDate(),
        draggable: true,
        resource: 1
      },
      {
        title: 'Draggable event 3',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').add(1, 'days').toDate(),
        draggable: true,
        resource: 3
      }
    ];

    vm.externalEvents = [
      {
        title: 'Event 1',
        type: 'warning',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true,
        resource: null
      },
      {
        title: 'Event 2',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true,
        resource: null
      },
      {
        title: 'Event 3',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true,
        resource: null
      },
      {
        title: 'Event 4',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true,
        resource: null
      }
    ];

    vm.calendarView = 'day-range';
    vm.viewDate = moment().startOf('week').toDate();
    vm.viewDateStart = moment().startOf('week').toDate();
    vm.viewDateEnd =  moment().startOf('week').add(4, 'days').toDate();
    vm.dayViewStart = "09:00";
    vm.dayViewEnd = "14:00";
    vm.cellIsOpen = false;
    // vm.resources = [{
    //     id: 0,
    //     serviceman: 23232,
    //     label: 'Resource 1'
    //   }, {
    //     id: 1,
    //     serviceman: 34444,
    //     label: 'Resource 2'
    //   }, {
    //     id: 2,
    //     serviceman: 33222,
    //     label: 'Resource 3'
    //   }, {
    //     id: 3,
    //     serviceman: 86544,
    //     label: 'Resource 4'
    //   }];

      vm.backup = {};

    vm.toggle = function() {
      // if(vm.resources.length == 4) {
      //   vm.backup = vm.resources.splice(0,1)[0];
      // } else {
      //   vm.resources.push(vm.backup);
      // }

      // vm.resources.sort(function(a,b) {
      //   if(a.id < b.id) return -1;
      //   if(a.id > b.id) return 1;
      //   return 0;
      // });

      // $scope.$broadcast('calendar.refreshView');

      // vm.resources = [];
      // var i = 0;
      // for(idx in vm.res) {
      //   if(vm.res[idx] == true) {
      //     vm.resources.push({id: i, serviceman: 144+idx, label: 'servicemen' + idx});
      //   }
      //   i++;
      // }
      var more = false;
      if(vm.resources.length == 3) {
        more = true;
      } else {
        vm.resources.pop();        
      }

      vm.resources.pop();
      vm.resources.pop();
      vm.resources.pop();
      vm.resources.push({id: 0, serviceman: 1440, label: 'servicemen' + 0});
      vm.resources.push({id: 1, serviceman: 1441, label: 'servicemen' + 1});
      vm.resources.push({id: 2, serviceman: 1442, label: 'servicemen' + 2});
      if(more == true) {
        vm.resources.push({id: 3, serviceman: 1443, label: 'servicemen' + 3});      
      }

      console.log(2, vm.resources);
      $scope.$broadcast('calendar.refreshView');
    };

    vm.flip = function() {
      var a = vm.resources.splice(0,1);
      var b = vm.resources.splice(0,1);
      a = a[0];
      b = b[0];
      a.id = 1 - a.id;
      b.id = 1 - b.id;
      vm.resources.push(a);
      vm.resources.push(b);
      vm.resources.sort(function(a,b) {
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0;
      });
      console.log(2,vm.resources);
      $scope.$broadcast('calendar.refreshView');
      setTimeout(function() {$scope.$broadcast('calendar.refreshView')}, 1000);
    };

    vm.dragStart = function(event) {
      console.log(1, event);
    };

    vm.dragStop = function(event) {
      console.log(2, event);
    };

    vm.eventDropped = function(event, start, end, resource, fromCalendar) {
      /* Function that gets called whenever an event is dropped on
         the calendar view */

      if(!fromCalendar && vm.events.indexOf(event) > -1
          && moment(start).isBetween(moment(event.startsAt).startOf('day'), moment(event.startsAt).endOf('day'))) {
        /* This is a check to prevent double dropping, which causes
            the events to be randomly placed wrongly */
        return;
      }

      /* Case 1: an event is dragged from the sidebar (external events)
         into the calendar. It is removed from the list of external events
         and pushed into the list of events (which are in the calendar) */
      var externalIndex = vm.externalEvents.indexOf(event);
      var internalIndex = vm.events.indexOf(event);

      if (externalIndex > -1 && fromCalendar !== true) {
        /* Check if events overlap */
        for (var idx = 0; idx < vm.events.length; idx++) {
          if (vm.events[idx].calendarEventId !== event.calendarEventId && vm.events[idx].resource === resource) {
            if (moment(start).isBetween(vm.events[idx].startsAt, vm.events[idx].endsAt) ||
              moment(end).isBetween(vm.events[idx].startsAt, vm.events[idx].endsAt) ||
              moment(vm.events[idx].startsAt).isBetween(start, end) ||
              moment(vm.events[idx].endsAt).isBetween(start, end)) {
                return;
              }
          }
        }
        vm.externalEvents.splice(externalIndex, 1);
        vm.events.push(event);
      }

      /* Case 2: an event is dragged from the calendar into the sidebar
         (hence the resource equals undefined). It is removed from the
         list of events and pushed into the list of external events */
      if (internalIndex > -1 && resource === -1) {
        console.log('check');
        vm.events.splice(internalIndex, 1);
        vm.externalEvents.push(event);
        return;
      }

      /* Check if: day in day range and time within dayViewStart and dayViewEnd */
      if(moment(start).isBetween(moment(vm.viewDateStart).startOf('day'), moment(vm.viewDateEnd).endOf('day'))) {
        dayStart = moment(vm.dayViewStart, 'HH:mm');
        dayEnd = moment(vm.dayViewEnd, 'HH:mm');

        if(moment(start).isBetween(moment(start).hour(dayStart.hour()).minute(dayStart.minute()),
            moment(start).hour(dayEnd.hour()).minute(dayEnd.minute()))) {
          /* valid */
          event.startsAt = start;
          if (end) {
            event.endsAt = end;
          }
          event.resource = resource;

          /* Add the id of the serviceman to the event, since the
             IDs of the resources depend only on the ordering of
             the columns. */
          var serviceman = vm.resources.filter(function(obj) {
            return obj.id == resource;
          });
          event.serviceman = serviceman[0].serviceman;
          vm.cellIsOpen = true;

        }
      }
    };

  });
