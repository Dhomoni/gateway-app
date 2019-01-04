import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Medicine from './medicine';
import MedicineDetail from './medicine-detail';
import MedicineUpdate from './medicine-update';
import MedicineDeleteDialog from './medicine-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MedicineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MedicineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MedicineDetail} />
      <ErrorBoundaryRoute path={match.url} component={Medicine} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MedicineDeleteDialog} />
  </>
);

export default Routes;
