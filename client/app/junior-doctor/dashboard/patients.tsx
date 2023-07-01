import { AppDispatch } from '@/redux/store';
import { TypePatient } from '../../../../server/types/types';
import { useDispatch } from 'react-redux';
import { setChatPatient } from '@/redux/features/chat-patient-slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { TUser } from '@/types/types';
import { toggleDisplayChat } from '@/redux/features/display-chat';
import JuniorDoctorMessages from './messages';
import { setPatientToView } from '@/redux/features/patient-to-view-slice';

interface Props {
  allPatients: TypePatient[];
}

export default function AllPatients({ allPatients }: Props) {
  const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  const userType = typeof window !== 'undefined' && localStorage.getItem('userType') as string;
  // const [displayChat, setDisplayChat] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const displayChat = useAppSelector((state) => state.toggleDisplayChat.value);
  const currentJunior = useAppSelector((state) => state.currentJuniorReducer.value);
  const patientToView = useAppSelector((state) => state.patientToViewReducer.value);
  const router = useRouter();

  function chatToPatient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, patient:TypePatient) {
    const target = e.target as HTMLButtonElement;
    if (target.name === 'patient-details') {
      // navigate to the patient details
      dispatch(setPatientToView(patient))
      router.push(`dashboard/patient/${target.id}`);
    } else if (target.name === 'chat') {
      // set the selected patient
      dispatch(toggleDisplayChat()); 
      console.log('chat');
      const patientToChat = {
        id: target.id,
        name: target.title,
      };
      console.log(patientToChat);
      dispatch(setChatPatient(patientToChat));
    }
  }

  return (
    <main className="flex min-h-screen flex-col box-border">
      <div className="container">
        <section className="discussions">
          <div className="discussion search">
            <div className="searchbar">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          {allPatients.map((patient: TypePatient) => {
            return (
              <div className="discussion" key={patient.id}>
                <div className="desc-contact">
                  <h2 className="name">{patient.name}</h2>
                  <button
                    id={patient.id}
                    name="patient-details"
                    title={patient.name}
                    onClick={(e) => {
                      chatToPatient(e, patient);
                    }}
                  >
                    Patient Details
                  </button>
                  <button
                    id={patient.id}
                    title={patient.name}
                    name="chat"
                    onClick={(e) => {
                      chatToPatient(e, patient);
                    }}
                  >
                    Chat
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
