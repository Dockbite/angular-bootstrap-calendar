angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.eventDroppedInList = function(event) {
      var internalIndex = vm.events.indexOf(event);
      if (internalIndex > -1) {
        vm.events.splice(internalIndex, 1);
        vm.externalEvents.push(event);
      }
    }

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
    vm.viewDate = moment().startOf('month').toDate();
    vm.viewDateStart = moment().startOf('month').toDate();
    vm.viewDateEnd =  moment().startOf('month').add(4, 'days').toDate();
    vm.dayViewStart = "09:00";
    vm.dayViewEnd = "14:00";
    vm.cellIsOpen = false;
    vm.resources = [{
        id: 0,
        serviceman: 23232,
        label: 'Resource 1'
      }, {
        id: 1,
        serviceman: 34444,
        label: 'Resource 2'
      }, {
        id: 2,
        serviceman: 33222,
        label: 'Resource 3'
      }, {
        id: 3,
        serviceman: 86544,
        label: 'Resource 4'
      }];

    vm.eventDropped = function(event, start, end, resource, fromCalendar) {
      // console.log(start);
      // console.log(event.startsAt);

      console.log(vm.dayViewStart);

      if(!fromCalendar && vm.events.indexOf(event) > -1) {
        /* This is a check to prevent double dropping, which causes
            the events to be randomly placed wrongly */
        return;
      }

      var externalIndex = vm.externalEvents.indexOf(event);
      if (externalIndex > -1 && fromCalendar !== true) {
        vm.externalEvents.splice(externalIndex, 1);
        vm.events.push(event);
      }

      var internalIndex = vm.events.indexOf(event);
      if (internalIndex > -1 && resource === 'undefined') {
        vm.events.splice(internalIndex, 1);
        vm.externalEvents.push(event);
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
          vm.cellIsOpen = true;

        }
      }
    };

  });
