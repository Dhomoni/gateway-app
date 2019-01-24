import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Home from './home';
import DoctorDetail from './doctor-detail';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DoctorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Home} />
    </Switch>
  </div>
);

export default Routes;
