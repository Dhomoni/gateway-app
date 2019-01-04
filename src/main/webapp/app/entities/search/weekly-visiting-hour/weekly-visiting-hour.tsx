import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './weekly-visiting-hour.reducer';
import { IWeeklyVisitingHour } from 'app/shared/model/search/weekly-visiting-hour.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IWeeklyVisitingHourProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IWeeklyVisitingHourState = IPaginationBaseState;

export class WeeklyVisitingHour extends React.Component<IWeeklyVisitingHourProps, IWeeklyVisitingHourState> {
  state: IWeeklyVisitingHourState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { weeklyVisitingHourList, match } = this.props;
    return (
      <div>
        <h2 id="weekly-visiting-hour-heading">
          <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.home.title">Weekly Visiting Hours</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.home.createLabel">Create new Weekly Visiting Hour</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('weekDay')}>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.weekDay">Week Day</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('startHour')}>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startHour">Start Hour</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('startMinute')}>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.startMinute">Start Minute</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('endHour')}>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endHour">End Hour</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('endMinute')}>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.endMinute">End Minute</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="dhomoniApp.searchWeeklyVisitingHour.chamber">Chamber</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {weeklyVisitingHourList.map((weeklyVisitingHour, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${weeklyVisitingHour.id}`} color="link" size="sm">
                        {weeklyVisitingHour.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`dhomoniApp.WeekDay.${weeklyVisitingHour.weekDay}`} />
                    </td>
                    <td>{weeklyVisitingHour.startHour}</td>
                    <td>{weeklyVisitingHour.startMinute}</td>
                    <td>{weeklyVisitingHour.endHour}</td>
                    <td>{weeklyVisitingHour.endMinute}</td>
                    <td>
                      {weeklyVisitingHour.chamber ? (
                        <Link to={`chamber/${weeklyVisitingHour.chamber.id}`}>{weeklyVisitingHour.chamber.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${weeklyVisitingHour.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${weeklyVisitingHour.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${weeklyVisitingHour.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ weeklyVisitingHour }: IRootState) => ({
  weeklyVisitingHourList: weeklyVisitingHour.entities,
  totalItems: weeklyVisitingHour.totalItems,
  links: weeklyVisitingHour.links,
  entity: weeklyVisitingHour.entity,
  updateSuccess: weeklyVisitingHour.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyVisitingHour);
