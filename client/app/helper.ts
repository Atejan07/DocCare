export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

//for splicing the ilnesses
export function toFirstLetterUpperCase(word: string) {
  return word.charAt(1).toUpperCase();
}

export function futureDate(date: string) {
  const now = new Date();
  const inputStartDate = new Date(date);
  if (inputStartDate < now) return true;
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov' ,'Dec']
export function formatTime(time:string) {
  const timeArr = time.split(':')
  let minutes = timeArr[1]
  let hour = Number(timeArr[0])
  const amOrPm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formattedTime = hour + ':' + minutes + ' ' + amOrPm;
  return formattedTime;
}

export function formatDate(date:string) {
  let append
  const dateSplit = date.split('-')
  const day = dateSplit[dateSplit.length-1].split('')
  const month = dateSplit[1].split('')
  if(day[day.length-1] == '1') {
    append = 'st'
  }else if (day[day.length-1] == '2') {
    append = 'nd'
  } else if(day[day.length-1] == '3') {
    append = 'rd'
  } else {
    append = 'th'
  }
  return `${day.join('')+append} of ${months[Number(month[1]) -1]}`
}
