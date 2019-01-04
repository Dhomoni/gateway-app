import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Doctor from './search/doctor';
import MedicalDepartment from './search/medical-department';
import Disease from './search/disease';
import Chamber from './search/chamber';
import WeeklyVisitingHour from './search/weekly-visiting-hour';
import ProfessionalDegree from './search/professional-degree';
import Patient from './search/patient';
import Medicine from './search/medicine';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/doctor`} component={Doctor} />
      <ErrorBoundaryRoute path={`${match.url}/medical-department`} component={MedicalDepartment} />
      <ErrorBoundaryRoute path={`${match.url}/disease`} component={Disease} />
      <ErrorBoundaryRoute path={`${match.url}/chamber`} component={Chamber} />
      <ErrorBoundaryRoute path={`${match.url}/weekly-visiting-hour`} component={WeeklyVisitingHour} />
      <ErrorBoundaryRoute path={`${match.url}/professional-degree`} component={ProfessionalDegree} />
      <ErrorBoundaryRoute path={`${match.url}/patient`} component={Patient} />
      <ErrorBoundaryRoute path={`${match.url}/medicine`} component={Medicine} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
