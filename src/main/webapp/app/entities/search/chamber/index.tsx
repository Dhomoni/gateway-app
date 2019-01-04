import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chamber from './chamber';
import ChamberDetail from './chamber-detail';
import ChamberUpdate from './chamber-update';
import ChamberDeleteDialog from './chamber-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChamberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChamberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChamberDetail} />
      <ErrorBoundaryRoute path={match.url} component={Chamber} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChamberDeleteDialog} />
  </>
);

export default Routes;
