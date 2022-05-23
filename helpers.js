export function isValidUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function getSource(value) {
  const tmp = document.createElement("a");
  tmp.href = value;
  return tmp["hostname"].replace(/www./g, "");
}

export function formatDate(value) {
  // From '2021-09-26T10:51:04.314Z'
  // From youtube '2022-05-19T09:12:59Z'
  // To 'YYYY, MM, DD, HH, MM, SS'

  let date = value.split("T")[0];
  let dateInArray = date.split("-");

  let hours = value.split("T")[1];
  let hoursInArray = hours.split(":");

  let newDate = new Date(
    Date.UTC(
      dateInArray[0],
      dateInArray[1] - 1, // Months are counted from 0 to 11
      dateInArray[2],
      hoursInArray[0],
      hoursInArray[1],
      //hoursInArray[2].split(".")[0]
      hoursInArray[2].split("Z")[0]
    )
  );

  return newDate;
}

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
