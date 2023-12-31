const { Sequelize } = require('sequelize')
const { initModels } = require('../compiled/models/schema/associations');
const { specialisations,
  doctorNames,
  doctorLicenseNumbers,
  addresses,
  phoneNumbers,
  doctorEmails,
  passwords,
  doctorPictures,
  aboutDoctor
} = require('./doctorHelper')
const {
  patientNames,
  patientEmails,
  patientPictures
} = require('./patientHelper')
const {
  randomJuniorDoctorNames,
  juniorDoctorEmails
} = require('./juniorDoctorHelpers')
const dotenv = require('dotenv')
dotenv.config();

const dbName = 'DocCare';

const db = new Sequelize(
  dbName,
  `${process.env.MYSQL_USERNAME}` || 'root',
  `${process.env.MYSQL_PASSWORD}` || '',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
);

const { Doctor, JuniorDoctor, Patient } = initModels(db);

(async function authenticate () {
  try {
    await db.sync({ force: true });
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})().then(() => {
  seedDB().then(() => {
    db.close()
  })
})

const genders = ['Male', 'Female']
function createEmptyAvailability () {
  const availability = {};
  const month = {};
  for (let day = 1; day <= 31; day++) {
    month[day] = [];
  }
  for (let monthNum = 1; monthNum <= 12; monthNum++) {
    availability[monthNum] = month;
  }
  return availability;
}

function generateRandomDate (from, to) {
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}

const seedDB = async () => {
  for (let i = 0; i < 10; i++) {
    // const num = Math.floor(Math.random() * 10);
    // const spec = Math.floor(Math.random() * specialisations.length);
    const gen = Math.floor(Math.random() * 3)

    const doctor = await Doctor.create({
      name: doctorNames[i],
      email: doctorEmails[i],
      password: passwords[i],
      specialisation: specialisations[0],
      phoneNumber: phoneNumbers[i],
      address: addresses[i],
      licenseNumber: doctorLicenseNumbers[i],
      gender: genders[gen],
      profilePicture: doctorPictures[i],
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      availability: createEmptyAvailability(),
      userType: 'doctor',
      about: aboutDoctor[i]
    })

    const juniorDoctor = await JuniorDoctor.create({
      name: randomJuniorDoctorNames[i],
      email: juniorDoctorEmails[i],
      password: passwords[i],
      licenseNumber: doctorLicenseNumbers[i],
      phoneNumber: phoneNumbers[i],
      address: addresses[i],
      gender: genders[gen],
      profilePicture: doctorPictures[i],
      userType: 'junior-doctor'
    })

    const patient = await Patient.create({
      name: patientNames[i],
      email: patientEmails[i],
      password: passwords[i],
      phoneNumber: phoneNumbers[i],
      address: addresses[i],
      dateOfBirth: generateRandomDate(new Date(1994, 0, 1), new Date()),
      gender: genders[gen],
      profilePicture: patientPictures[i],
      userType: 'patient',
      allergies: 'dairy, nuts',
      bloodType: 'AB-',
      medications: 'N/A',
      surgicalHistory: 'N/A',
      familyMedicalHistory: 'N/A',
      status: 'Online'
    })
  }
}

