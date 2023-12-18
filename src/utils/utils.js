export function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
}

export function stringAvatar(name) {
  return {
    children: `${name?.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export function getEventsInfo(eventsArray) {
  // Get the current date
  const currentDate = new Date();

  // Find the next event
  const nextEvent = eventsArray.reduce(
    (previous, current) => {
      const currentStartDate = new Date(current.start);

      if (currentStartDate > currentDate && currentStartDate < previous.start) {
        return {
          start: currentStartDate,
          event: current,
        };
      }

      return previous;
    },
    { start: new Date("9999-12-31T23:59:59.999Z"), event: null }
  ).event;

  // Find the last completed event
  const lastCompletedEvent = eventsArray.reduce(
    (previous, current) => {
      const currentEndDate = new Date(current.end);

      if (currentEndDate < currentDate && currentEndDate > previous.end) {
        return {
          end: currentEndDate,
          event: current,
        };
      }

      return previous;
    },
    { end: new Date("1970-01-01T00:00:00.000Z"), event: null }
  ).event;

  // Find the latest created event
  const latestCreatedEvent = eventsArray.reduce(
    (previous, current) => {
      const currentCreatedAt = new Date(current.createdAt);

      if (currentCreatedAt > previous.createdAt) {
        return {
          createdAt: currentCreatedAt,
          event: current,
        };
      }

      return previous;
    },
    { createdAt: new Date("1970-01-01T00:00:00.000Z"), event: null }
  ).event;

  return {
    nextEvent,
    lastCompletedEvent,
    latestCreatedEvent,
  };
}
export function findEventWithMostGuests(events) {
  let eventWithMostGuests = null;
  let maxGuestsCount = 0;

  for (const event of events) {
    const guestsCount = event.guestLists.length;

    if (guestsCount > maxGuestsCount) {
      maxGuestsCount = guestsCount;
      eventWithMostGuests = event;
    }
  }

  return eventWithMostGuests;
}
