/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DoctorComponentsPage from './doctor.page-object';
import { DoctorDeleteDialog } from './doctor.page-object';
import DoctorUpdatePage from './doctor-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Doctor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let doctorUpdatePage: DoctorUpdatePage;
  let doctorComponentsPage: DoctorComponentsPage;
  let doctorDeleteDialog: DoctorDeleteDialog;
  const fileToUpload = '../../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Doctors', async () => {
    await navBarPage.getEntityPage('doctor');
    doctorComponentsPage = new DoctorComponentsPage();
    expect(await doctorComponentsPage.getTitle().getText()).to.match(/Doctors/);
  });

  it('should load create Doctor page', async () => {
    await doctorComponentsPage.clickOnCreateButton();
    doctorUpdatePage = new DoctorUpdatePage();
    expect(await doctorUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchDoctor.home.createOrEditLabel/);
  });

  it('should create and save Doctors', async () => {
    const nbButtonsBeforeCreate = await doctorComponentsPage.countDeleteButtons();

    await doctorUpdatePage.setRegistrationIdInput('5');
    expect(await doctorUpdatePage.getRegistrationIdInput()).to.eq('5');
    await doctorUpdatePage.setFirstNameInput('firstName');
    expect(await doctorUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await doctorUpdatePage.setLastNameInput('lastName');
    expect(await doctorUpdatePage.getLastNameInput()).to.match(/lastName/);
    await doctorUpdatePage.setEmailInput('email');
    expect(await doctorUpdatePage.getEmailInput()).to.match(/email/);
    await doctorUpdatePage.setPhoneInput('phone');
    expect(await doctorUpdatePage.getPhoneInput()).to.match(/phone/);
    await doctorUpdatePage.setLicenceNumberInput('licenceNumber');
    expect(await doctorUpdatePage.getLicenceNumberInput()).to.match(/licenceNumber/);
    await doctorUpdatePage.setNationalIdInput('nationalId');
    expect(await doctorUpdatePage.getNationalIdInput()).to.match(/nationalId/);
    await doctorUpdatePage.setPassportNoInput('passportNo');
    expect(await doctorUpdatePage.getPassportNoInput()).to.match(/passportNo/);
    await doctorUpdatePage.typeSelectLastOption();
    await doctorUpdatePage.setDesignationInput('designation');
    expect(await doctorUpdatePage.getDesignationInput()).to.match(/designation/);
    await doctorUpdatePage.setInstituteInput('institute');
    expect(await doctorUpdatePage.getInstituteInput()).to.match(/institute/);
    await doctorUpdatePage.setSpecialityInput('speciality');
    expect(await doctorUpdatePage.getSpecialityInput()).to.match(/speciality/);
    await doctorUpdatePage.setDescriptionInput('description');
    expect(await doctorUpdatePage.getDescriptionInput()).to.match(/description/);
    await doctorUpdatePage.setAddressInput('address');
    expect(await doctorUpdatePage.getAddressInput()).to.match(/address/);
    await doctorUpdatePage.setImageInput(absolutePath);
    const selectedActivated = await doctorUpdatePage.getActivatedInput().isSelected();
    if (selectedActivated) {
      await doctorUpdatePage.getActivatedInput().click();
      expect(await doctorUpdatePage.getActivatedInput().isSelected()).to.be.false;
    } else {
      await doctorUpdatePage.getActivatedInput().click();
      expect(await doctorUpdatePage.getActivatedInput().isSelected()).to.be.true;
    }
    await doctorUpdatePage.medicalDepartmentSelectLastOption();
    await waitUntilDisplayed(doctorUpdatePage.getSaveButton());
    await doctorUpdatePage.save();
    await waitUntilHidden(doctorUpdatePage.getSaveButton());
    expect(await doctorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await doctorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await doctorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Doctor', async () => {
    await doctorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await doctorComponentsPage.countDeleteButtons();
    await doctorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    doctorDeleteDialog = new DoctorDeleteDialog();
    expect(await doctorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchDoctor.delete.question/);
    await doctorDeleteDialog.clickOnConfirmButton();

    await doctorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await doctorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
