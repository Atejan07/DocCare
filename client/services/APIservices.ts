import axios, { AxiosResponse } from 'axios';
import {
  TypeDoctor,
  TypePatient,
  TypeJuniorDoctor,
  TypeMedicalInfo,
  TypeAppointment,
  TypeMessage,
} from '../../server/types/types';
import {
  TypeResponseDoctor,
  TypeResponseJuniorDoctor,
  TypeResponsePatient,
  TypeResponseMedicalInfo,
  TypeResponseSummary,
  TypeLogin,
  TypeSummary,
  TPatient,
  TResponseUser,
  TypeRegister,
  TypeResponseLastCheckup,
  TypeResponseAppointment,
  TUser,
  TypeResponseJuniorNotes,
} from '@/types/types';

const PORT = 'http://localhost:3001';
const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

async function putData(path: string, content: TypePatient | TypeMedicalInfo) {
  return axios
    .put(PORT + path, JSON.stringify(content), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TPatient>) => {
      return res.data;
    });
}

async function fetchData(token: string, path: string) {
  console.log(token, path);
  return axios
    .get(`${PORT}/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypePatient[] | TypeDoctor[]>) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

async function register(user: TUser, type: string) {
  let path;
  if (type == 'doctor') {
    path = '/doctor';
  } else if (type == 'patient') {
    path = '/patient';
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor';
  }
  return axios
    .post(PORT + path + '/register', JSON.stringify(user), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeRegister>) => {
      console.log(res.data);
      return res.data;
    }).catch((error) => {
      console.log(error)
      return error
    });
}

async function saveImage(imageData: {}) {
  return axios
    .post(endpoint, imageData)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => console.log(error));
}

async function login(user: TypeLogin, type: string) {
  let path;
  if (type == 'doctor') {
    path = '/doctor';
  } else if (type == 'patient') {
    path = '/patient';
  } else if (type == 'junior-doctor') {
    path = '/junior-doctor';
  }
  return axios
    .post(PORT + path + '/login', JSON.stringify(user), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getAllDoctors(token: string) {
  return fetchData(token, 'doctors');
}

async function getMedicalInfo(
  patientId: string,
  medicalInfo: TypeMedicalInfo
): Promise<TypeResponseMedicalInfo> {
  return axios
    .put(
      `${PORT}/doctor/medical-info/${patientId}`,
      JSON.stringify(medicalInfo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse<TypeResponseMedicalInfo>) => {
      return res.data;
    });
}

async function createPatientSummary(
  patientId: string,
  summary: TypeSummary
): Promise<TypeResponseSummary> {
  return axios
    .put(`${PORT}/doctor/summary/${patientId}`, JSON.stringify(summary), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponseSummary>) => {
      return res.data;
    });
}

async function getAllPatients(token: string) {
  return fetchData(token, 'patients');
}

// async function getAllPatients(): Promise<TypeResponsePatient> {
//   console.log('hey from api service getallpatients');
//   return axios
//     .get(`${PORT}/patients`, {
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       withCredentials: true,
//     })
//     .then((res: AxiosResponse<TypeResponsePatient>) => {
//       console.log(res);
//       return res.data;
//     });
// }

async function logoutPatient(patientId: string, patientDetails: TypePatient) {
  return putData(`/patients/logout/${patientId}`, patientDetails);
}

async function editPatientDetails(
  patientId: string,
  patientDetails: TypePatient
): Promise<TPatient> {
  return putData(`/patient/${patientId}`, patientDetails);
}

async function deletePatient(patientId: string): Promise<TypeResponsePatient> {
  return axios
    .get(`${PORT}/patient/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponsePatient>) => {
      return res.data;
    });
}

async function getLastCheckup(
  patientId: string
): Promise<TypeResponseLastCheckup> {
  return axios
    .get(`${PORT}/patient/last-checkup/${patientId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponseLastCheckup>) => {
      return res.data;
    });
}

async function createAppointment(
  patientId: string,
  appointment: TypeAppointment,
  doctorId: string
) {
  console.log(appointment);
  return axios
    .post(
      `${PORT}/patient/appointment/${patientId}`,
      JSON.stringify({ appointment, doctorId }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function attendAppointment(
  appointmentId: string,
  token: string
): Promise<TypeResponseJuniorNotes> {
  console.log(token);
  return axios
    .put(`${PORT}/doctor/attend/${appointmentId}`, JSON.stringify({}), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeResponseJuniorNotes>) => {
      return res.data;
    })
    .catch((error) => error.response.data.error);
}

async function getUser(token: string, user: string) {
  return axios
    .get(`${PORT}/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
}

async function createJuniorNote(
  juniorID: string,
  juniorNote: string
): Promise<TypeResponseJuniorNotes> {
  return axios
    .post(
      `${PORT}/patient/appointment/${juniorID}`,
      JSON.stringify(juniorNote),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse<TypeResponseJuniorNotes>) => {
      return res.data;
    });
}

async function getAllMessages() {
  return axios
    .get(`${PORT}/messages`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    })
    .then((res: AxiosResponse<TypeMessage[]>) => {
      return res.data;
    });
}

const apiService = {
  register,
  login,
  getAllDoctors,
  getAllPatients,
  getMedicalInfo,
  createPatientSummary,
  editPatientDetails,
  deletePatient,
  getLastCheckup,
  createAppointment,
  getUser,
  createJuniorNote,
  saveImage,
  attendAppointment,
  logoutPatient,
  getAllMessages,
};

export default apiService;
