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
