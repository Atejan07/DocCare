export type TypeAvailability = { [day: number]: number[] };

export interface TypeDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  specialisation:
    | 'General Practice'
    | 'Internal Medicine'
    | 'Pediatrics'
    | 'Obstetrics and Gynecology'
    | 'Surgery'
    | 'Psychiatry'
    | 'Dermatology'
    | 'Ophthalmology'
    | 'Ear Nose and Throat (ENT)'
    | 'Cardiology'
    | 'Endocrinology'
    | 'Gastroenterology'
    | 'Neurology'
    | 'Oncology';
  phoneNumber: number;
  address: string;
  licenseNumber: string;
  gender: 'Male' | 'Female';
  about: string;
  availability?: TypeAvailability;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeAppointment {
  id?: string;
  date: string;
  time: string;
  attended: boolean;
  illness:
    | 'Common illnesses, minor injuries, preventive care, general health issues'
    | 'Chronic diseases, infections, autoimmune disorders, organ diseases'
    | 'Childhood illnesses, growth and development issues, vaccinations, pediatric infections'
    | 'Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications'
    | 'Surgical conditions, injuries requiring surgical intervention, post-operative care'
    | 'Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia'
    | 'Skin conditions, dermatitis, acne, psoriasis, skin cancer'
    | 'Eye diseases, vision problems, cataracts, glaucoma, macular degeneration'
    | 'Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders'
    | 'Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease'
    | 'Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders'
    | `Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`
    | 'Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis'
    | 'Cancer, various types and stages, chemotherapy, radiation therapy, palliative care';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeJuniorDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  address: string;
  licenseNumber: string;
  gender: 'Male' | 'Female' | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMedicalInfo {
  id?: string;
  prescription: string;
  doctorsNotes: string;
  doctorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeMessage {
  id?: string;
  content: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypePatient {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  address: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | null;
  juniorNotes?: string;
  summary?: string;
  conditions: {
    allergies: string;
    bloodType: string;
    medications: string;
    surgicalHistory: string;
    familyMedicalHistory: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
