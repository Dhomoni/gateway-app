import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MedicalDepartment from './medical-department';
import MedicalDepartmentDetail from './medical-department-detail';
import MedicalDepartmentUpdate from './medical-department-update';
import MedicalDepartmentDeleteDialog from './medical-department-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MedicalDepartmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MedicalDepartmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MedicalDepartmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={MedicalDepartment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MedicalDepartmentDeleteDialog} />
  </>
);

export default Routes;
