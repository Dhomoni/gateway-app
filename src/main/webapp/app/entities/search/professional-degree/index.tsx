import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfessionalDegree from './professional-degree';
import ProfessionalDegreeDetail from './professional-degree-detail';
import ProfessionalDegreeUpdate from './professional-degree-update';
import ProfessionalDegreeDeleteDialog from './professional-degree-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfessionalDegreeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfessionalDegreeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfessionalDegreeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfessionalDegree} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfessionalDegreeDeleteDialog} />
  </>
);

export default Routes;
