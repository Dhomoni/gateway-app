import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Symptom from './symptom';
import SymptomDetail from './symptom-detail';
import SymptomUpdate from './symptom-update';
import SymptomDeleteDialog from './symptom-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SymptomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SymptomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SymptomDetail} />
      <ErrorBoundaryRoute path={match.url} component={Symptom} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SymptomDeleteDialog} />
  </>
);

export default Routes;
