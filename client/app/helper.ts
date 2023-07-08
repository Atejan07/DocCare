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
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export function formatTime(time: string) {
  const timeArr = time.split(':');
  let minutes = timeArr[1];
  let hour = Number(timeArr[0]);
  const amOrPm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formattedTime = hour + ':' + minutes + ' ' + amOrPm;
  return formattedTime;
}

export function formatDate(date: string) {
  let append;
  const dateSplit = date.split('-');
  const day = dateSplit[dateSplit.length - 1].split('');
  let month = dateSplit[1];
  if (month.startsWith('0')) month = month[1];
  if (day[day.length - 1] == '1') {
    append = 'st';
  } else if (day[day.length - 1] == '2') {
    append = 'nd';
  } else if (day[day.length - 1] == '3') {
    append = 'rd';
  } else {
    append = 'th';
  }
  return `${day.join('') + append} of ${months[Number(month) - 1]}`;
}

let accessToken: string | null;
export function getAccessToken() {
  if (!accessToken) {
    accessToken = localStorage.getItem('accessToken');
  }
  return accessToken;
}

let userType: string | null;
export function getUserType() {
  if (!userType) {
    userType = localStorage.getItem('userType');
  }
  return userType;
}

export function clearLocalStorage() {
  accessToken = null;
  userType = null;
}

export function openMessage(
  messageApi: any,
  key: string,
  messageContent: string,
  router: any,
  path: string
) {
  messageApi.open({
    key,
    type: 'loading',
    content: 'Loading...',
  });
  setTimeout(() => {
    messageApi.open({
      key,
      type: 'success',
      content: messageContent,
      duration: 2,
    });
    setTimeout(() => {
      router.push(path);
    }, 2000);
  }, 1000);
}
