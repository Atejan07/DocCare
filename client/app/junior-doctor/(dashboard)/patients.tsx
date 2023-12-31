import { ChangeEvent, useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { TypePatient } from '../../../../server/types/types';
import { useDispatch } from 'react-redux';
import { setChatPatient } from '@/redux/features/chat-patient-slice';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { toggleDisplayChat } from '@/redux/features/display-chat';
import { MessageOutlined } from '@ant-design/icons';
import { setPatientToView } from '@/redux/features/patient-to-view-slice';
import { SearchOutlined } from '@ant-design/icons';
import { setFilteredPatients } from '@/redux/features/search-patient-slice';
import { toggleDisplaySection } from '@/redux/features/display-section';

interface Props {
  allPatients: TypePatient[];
}

export default function AllPatients({ allPatients }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const filteredPatients = useAppSelector(
    (state) => state.patients.filteredPatients
  );
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  function chatToPatient(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    patient: TypePatient
  ) {
    const target =
      (e.target as HTMLElement).nodeName === 'BUTTON'
        ? (e.target as HTMLButtonElement)
        : ((e.target as HTMLElement).parentNode
            ?.parentNode as HTMLButtonElement);
    if (target.name === 'patient-details') {
      dispatch(setPatientToView(patient));
      router.push(`/junior-doctor/${target.id}`);
    } else if (target.name === 'chat') {
      dispatch(toggleDisplayChat(true));
      const patientToChat = {
        id: target.id,
        name: target.title,
      };
      dispatch(setChatPatient(patientToChat));
      dispatch(toggleDisplaySection(false));
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    const filteredPatients = allPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(setFilteredPatients(filteredPatients));
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const hideAllPatients = windowWidth < 500;

  return (
    <section
      className={hideAllPatients ? 'discussions-no-margin' : 'discussions'}
    >
      <div className='discussion search'>
        <div className='searchbar'>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            onClick={(e) =>
              handleSearch(e as unknown as ChangeEvent<HTMLInputElement>)
            }
          >
            <SearchOutlined />
          </button>
        </div>
      </div>
      {searchQuery === ''
        ? allPatients &&
          allPatients.map((patient: TypePatient) => (
            <div className='discussion' key={patient.id}>
              <div className='desc-contact'>
                <h2 className='name'>{patient.name}</h2>
                <div className='buttons-see-more-detail'>
                  <button
                    id={patient.id}
                    name='patient-details'
                    title={patient.name}
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    Patient Details
                  </button>
                  <button
                    id={patient.id}
                    title={patient.name}
                    name='chat'
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    <MessageOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))
        : filteredPatients &&
          filteredPatients.map((patient: TypePatient) => (
            <div className='discussion' key={patient.id}>
              <div className='desc-contact'>
                <h2 className='name'>{patient.name}</h2>
                <div className='buttons-see-more-detail'>
                  <button
                    id={patient.id}
                    name='patient-details'
                    title={patient.name}
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    Patient Details
                  </button>
                  <button
                    id={patient.id}
                    title={patient.name}
                    name='chat'
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    <MessageOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
}
