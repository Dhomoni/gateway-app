/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PatientComponentsPage from './patient.page-object';
import { PatientDeleteDialog } from './patient.page-object';
import PatientUpdatePage from './patient-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Patient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientUpdatePage: PatientUpdatePage;
  let patientComponentsPage: PatientComponentsPage;
  let patientDeleteDialog: PatientDeleteDialog;
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

  it('should load Patients', async () => {
    await navBarPage.getEntityPage('patient');
    patientComponentsPage = new PatientComponentsPage();
    expect(await patientComponentsPage.getTitle().getText()).to.match(/Patients/);
  });

  it('should load create Patient page', async () => {
    await patientComponentsPage.clickOnCreateButton();
    patientUpdatePage = new PatientUpdatePage();
    expect(await patientUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchPatient.home.createOrEditLabel/);
  });

  it('should create and save Patients', async () => {
    const nbButtonsBeforeCreate = await patientComponentsPage.countDeleteButtons();

    await patientUpdatePage.setRegistrationIdInput('5');
    expect(await patientUpdatePage.getRegistrationIdInput()).to.eq('5');
    await patientUpdatePage.setFirstNameInput('firstName');
    expect(await patientUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await patientUpdatePage.setLastNameInput('lastName');
    expect(await patientUpdatePage.getLastNameInput()).to.match(/lastName/);
    await patientUpdatePage.setEmailInput('email');
    expect(await patientUpdatePage.getEmailInput()).to.match(/email/);
    await patientUpdatePage.setPhoneInput('phone');
    expect(await patientUpdatePage.getPhoneInput()).to.match(/phone/);
    await patientUpdatePage.sexSelectLastOption();
    await patientUpdatePage.setBirthTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await patientUpdatePage.getBirthTimestampInput()).to.contain('2001-01-01T02:30');
    await patientUpdatePage.bloodGroupSelectLastOption();
    await patientUpdatePage.setWeightInKGInput('5');
    expect(await patientUpdatePage.getWeightInKGInput()).to.eq('5');
    await patientUpdatePage.setHeightInInchInput('5');
    expect(await patientUpdatePage.getHeightInInchInput()).to.eq('5');
    await patientUpdatePage.setAddressInput('address');
    expect(await patientUpdatePage.getAddressInput()).to.match(/address/);
    await patientUpdatePage.setImageInput(absolutePath);
    const selectedActivated = await patientUpdatePage.getActivatedInput().isSelected();
    if (selectedActivated) {
      await patientUpdatePage.getActivatedInput().click();
      expect(await patientUpdatePage.getActivatedInput().isSelected()).to.be.false;
    } else {
      await patientUpdatePage.getActivatedInput().click();
      expect(await patientUpdatePage.getActivatedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(patientUpdatePage.getSaveButton());
    await patientUpdatePage.save();
    await waitUntilHidden(patientUpdatePage.getSaveButton());
    expect(await patientUpdatePage.getSaveButton().isPresent()).to.be.false;

    await patientComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Patient', async () => {
    await patientComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await patientComponentsPage.countDeleteButtons();
    await patientComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    patientDeleteDialog = new PatientDeleteDialog();
    expect(await patientDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchPatient.delete.question/);
    await patientDeleteDialog.clickOnConfirmButton();

    await patientComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
