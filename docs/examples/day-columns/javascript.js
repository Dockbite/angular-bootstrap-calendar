angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.droppedItem = function(asdf) {
      console.log("dropped some shizz");
      console.log(asdf);
    }

    vm.eventDroppedInList = function(event) {
      console.log("dropped something");
      console.log(event);
      var internalIndex = vm.events.indexOf(event);
      console.log(internalIndex);
      if (internalIndex > -1) {
        console.log(vm.events);
        vm.events.splice(internalIndex, 1);
        console.log(vm.events);
        console.log(vm.externalEvents.length);
        vm.externalEvents.push(event);
        console.log(vm.externalEvents.length);
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

      // console.log(resource);
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

      var validStartDate = moment(event.startsAt).startOf('day');
      var validEndDate = moment(event.startsAt).endOf('day');

      //
      if (moment(start).isBetween(validStartDate, validEndDate)) {
        event.startsAt = start;
        if (end) {
          event.endsAt = end;
        }
        event.resource = resource;
        vm.cellIsOpen = true;
      }
    };

  });
