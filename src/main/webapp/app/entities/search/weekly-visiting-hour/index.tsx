import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WeeklyVisitingHour from './weekly-visiting-hour';
import WeeklyVisitingHourDetail from './weekly-visiting-hour-detail';
import WeeklyVisitingHourUpdate from './weekly-visiting-hour-update';
import WeeklyVisitingHourDeleteDialog from './weekly-visiting-hour-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WeeklyVisitingHourUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WeeklyVisitingHourUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WeeklyVisitingHourDetail} />
      <ErrorBoundaryRoute path={match.url} component={WeeklyVisitingHour} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={WeeklyVisitingHourDeleteDialog} />
  </>
);

export default Routes;
