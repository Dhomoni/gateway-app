import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Home from './home';
import DoctorDetail from './doctor-detail';
import PatientDetail from './patient-detail';
import MedicineDetail from './medicine-detail';
import DiseaseDetail from './disease-detail';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/doctors/:id`} component={DoctorDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/patients/:id`} component={PatientDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/medicines/:id`} component={MedicineDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/diseases/:id`} component={DiseaseDetail} />
      <ErrorBoundaryRoute path={match.url} component={Home} />
    </Switch>
  </div>
);

export default Routes;
