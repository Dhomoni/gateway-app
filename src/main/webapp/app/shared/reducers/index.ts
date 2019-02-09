import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';
import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import doctor, { DoctorState } from 'app/entities/search/doctor/doctor.reducer';
import searchDoctor, { SearchDoctorState } from 'app/modules/home/doctor.reducer';
import medicalDepartment, { MedicalDepartmentState } from 'app/entities/search/medical-department/medical-department.reducer';
import disease, { DiseaseState } from 'app/entities/search/disease/disease.reducer';
import chamber, { ChamberState } from 'app/entities/search/chamber/chamber.reducer';
import weeklyVisitingHour, { WeeklyVisitingHourState } from 'app/entities/search/weekly-visiting-hour/weekly-visiting-hour.reducer';
import professionalDegree, { ProfessionalDegreeState } from 'app/entities/search/professional-degree/professional-degree.reducer';
import patient, { PatientState } from 'app/entities/search/patient/patient.reducer';
import searchPatient, { SearchPatientState } from 'app/modules/home/patient.reducer';
import medicine, { MedicineState } from 'app/entities/search/medicine/medicine.reducer';
import symptom, { SymptomState } from 'app/entities/search/symptom/symptom.reducer';
import indication, { IndicationState } from 'app/entities/search/indication/indication.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly doctor: DoctorState;
  readonly searchDoctor: SearchDoctorState;
  readonly medicalDepartment: MedicalDepartmentState;
  readonly disease: DiseaseState;
  readonly chamber: ChamberState;
  readonly weeklyVisitingHour: WeeklyVisitingHourState;
  readonly professionalDegree: ProfessionalDegreeState;
  readonly patient: PatientState;
  readonly searchPatient: SearchPatientState;
  readonly medicine: MedicineState;
  readonly symptom: SymptomState;
  readonly indication: IndicationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  doctor,
  searchDoctor,
  medicalDepartment,
  disease,
  chamber,
  weeklyVisitingHour,
  professionalDegree,
  patient,
  searchPatient,
  medicine,
  symptom,
  indication,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
