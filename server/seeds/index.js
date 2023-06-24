const { Sequelize } = require('sequelize')
const { initModels } = require('../compiled/models/schema/associations');
const { specialisations,
  doctorNames,
  doctorLicenseNumbers,
  addresses,
  phoneNumbers,
  doctorEmails,
  passwords } = require('./doctorHelper')
const {
  patientNames,
  patientEmails,
} = require('./patientHelper')
const {
  randomJuniorDoctorNames,
  juniorDoctorEmails
} = require('./juniorDoctorHelpers')
const dotenv = require('dotenv')
dotenv.config();

const dbName = 'DocCare';
const db = new Sequelize(dbName, 'root', 'Codeworks', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});


const { Message, Appointment, Condition, Doctor, JuniorDoctor, MedicalInfo, Patient } = initModels(db);

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

// seedDB().then(() => {
//   db.close();
// })

const genders = ['Male', 'Female']
function createEmptyAvailability () {
  const availability = {};
  for (let day = 1; day <= 31; day++) {
    availability[day] = [];
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
    const num = Math.floor(Math.random() * 10);
    const spec = Math.floor(Math.random() * specialisations.length);
    const gen = Math.floor(Math.random() * 2)
    const doctor = await Doctor.create({
      name: doctorNames[num],
      email: doctorEmails[num],
      password: passwords[num],
      specialisation: specialisations[spec],
      phoneNumber: phoneNumbers[num],
      address: addresses[num],
      licenseNumber: doctorLicenseNumbers[num],
      gender: genders[gen],
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      availability: createEmptyAvailability(),
    })

    const juniorDoctor = await JuniorDoctor.create({
      name: randomJuniorDoctorNames[num],
      email: juniorDoctorEmails[num],
      password: passwords[num],
      licenseNumber: doctorLicenseNumbers[num],
      phoneNumber: phoneNumbers[num],
      address: addresses[num],
      gender: genders[gen],
    })

    const patient = await Patient.create({
      name: patientNames[num],
      email: patientEmails[num],
      password: passwords[num],
      phoneNumber: phoneNumbers[num],
      address: addresses[num],
      dateOfBirth: generateRandomDate(new Date(1994, 0, 1), new Date()),
      gender: genders[gen],
    })
  }
}

