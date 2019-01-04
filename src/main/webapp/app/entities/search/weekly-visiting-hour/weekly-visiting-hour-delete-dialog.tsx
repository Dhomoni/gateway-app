import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IWeeklyVisitingHour } from 'app/shared/model/search/weekly-visiting-hour.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './weekly-visiting-hour.reducer';

export interface IWeeklyVisitingHourDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class WeeklyVisitingHourDeleteDialog extends React.Component<IWeeklyVisitingHourDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.weeklyVisitingHourEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { weeklyVisitingHourEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="dhomoniApp.searchWeeklyVisitingHour.delete.question">
          <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.delete.question" interpolate={{ id: weeklyVisitingHourEntity.id }}>
            Are you sure you want to delete this WeeklyVisitingHour?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-weeklyVisitingHour" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ weeklyVisitingHour }: IRootState) => ({
  weeklyVisitingHourEntity: weeklyVisitingHour.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyVisitingHourDeleteDialog);
