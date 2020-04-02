export function hourToStr(hours) {
  let hours12 = hours % 12
  let suffix = Math.trunc(hours/12) === 0 ? "am" : "pm"
  return hours12 + suffix;
}

export function timeRangeToStr(time) {
  return `${hourToStr(time.start)} - ${hourToStr(time.end)}`
}

export function timeRangesToStr(times) {
  if (typeof times === 'string' || times instanceof String) {
    if (! times) {
      return "Unknown"
    }
    return times;
  } else {
    return times.map(timeRangeToStr).join(", ");
  }
}

export function monthToStr(month) {
  switch (month) {
    case 1: return "Jan"
    case 2: return "Feb"
    case 3: return "Mar"
    case 4: return "Apr"
    case 5: return "May"
    case 6: return "Jun"
    case 7: return "July"
    case 8: return "Aug"
    case 9: return "Sept"
    case 10: return "Oct"
    case 11: return "Nov"
    case 12: return "Dec"
  }
}

export function monthRangeToStr(monthRange) {
  return `${monthToStr(monthRange.start)} - ${monthToStr(monthRange.end)}`
}

export function monthRangesToStr(months, hemisphere) {
  if (typeof months === 'string' || months instanceof String) {
    if (! months) {
      return "Unknown"
    }
    return months;
  } else {
    return months[hemisphere].map(monthRangeToStr).join(", ");
  }
}

function isMonthActive(creature, hemisphere) {
  if (creature.months === "All") {
    return true;
  }
  const cur = new Date().getMonth() + 1;  // js is 0 indexed.  data is 1 indexed
  const monthRanges = creature.months[hemisphere];
  return monthRanges.some((rng) => {
    return (rng.start <= cur && rng.end >= cur) ||
      (rng.start <= cur && rng.start > rng.end) ||
      (rng.start >= cur && rng.start > rng.end && rng.end >= cur)
  });
}

function isHourActive(creature) {
  if (creature.times === "All") {
    return true;
  }
  const cur = new Date().getHours();
  return creature.times.some((rng) => {
    return (rng.start <= cur && rng.end > cur) ||
      (rng.start <= cur && rng.start > rng.end) ||
      (rng.start >= cur && rng.start > rng.end && rng.end > cur)
  });
}

export function isCurrentlyActive(creature, hemisphere) {
  return isMonthActive(creature, hemisphere) && isHourActive(creature);
}

export function endsThisMonth(creature, hemisphere) {
  return creature.months === "All"
    ? false
    : creature.months[hemisphere].some((rng) => {return rng.end === (new Date().getMonth() + 1)});
}

export function newThisMonth(creature, hemisphere) {
  return creature.months === "All"
    ? false
    : creature.months[hemisphere].some((rng) => {return rng.start === (new Date().getMonth() + 1)});
}
