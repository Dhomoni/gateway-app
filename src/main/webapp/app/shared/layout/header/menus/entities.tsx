import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/doctor">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchDoctor" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/medical-department">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchMedicalDepartment" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/disease">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchDisease" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/chamber">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchChamber" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/weekly-visiting-hour">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchWeeklyVisitingHour" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/professional-degree">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchProfessionalDegree" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/patient">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchPatient" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/medicine">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.searchMedicine" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
