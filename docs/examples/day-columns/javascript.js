angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment, calendarConfig) {

    var vm = this;

    vm.events = [
      {
        title: 'Draggable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resource: 2
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
        resource: 0
      },
      {
        title: 'Event 2',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true,
        resource: 0
      },
      {
        title: 'Event 3',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true
      },
      {
        title: 'Event 4',
        type: 'danger',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate(),
        draggable: true,
        resizable: true
      }
    ];

    vm.calendarView = 'day';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = false;
    vm.resources = [{
        id: 23232,
        label: 'Resource 1'
      }, {
        id: 34444,
        label: 'Resource 2'
      }, {
        id: 33222,
        label: 'Resource 3'
      }, {
        id: 86544,
        label: 'Resource 4'
      }];

    vm.eventDropped = function(event, start, end, resource) {
      var externalIndex = vm.externalEvents.indexOf(event);
      if (externalIndex > -1) {
        vm.externalEvents.splice(externalIndex, 1);
        vm.events.push(event);
      }

      var validStartDate = moment(event.startsAt).startOf('day');
      var validEndDate   = moment(event.startsAt).endOf('day');

      // 
      if (moment(start).isBetween(validStartDate, validEndDate)) {
        event.startsAt = start;
        if (end) {
          event.endsAt = end;
        }
        event.resource = resource;
        vm.viewDate = start;
        vm.cellIsOpen = true;
      }
    };

  });
