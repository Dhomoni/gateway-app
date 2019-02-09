import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Indication from './indication';
import IndicationDetail from './indication-detail';
import IndicationUpdate from './indication-update';
import IndicationDeleteDialog from './indication-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IndicationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IndicationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IndicationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Indication} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IndicationDeleteDialog} />
  </>
);

export default Routes;
