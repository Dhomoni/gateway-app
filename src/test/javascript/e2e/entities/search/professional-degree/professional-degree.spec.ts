/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ProfessionalDegreeComponentsPage from './professional-degree.page-object';
import { ProfessionalDegreeDeleteDialog } from './professional-degree.page-object';
import ProfessionalDegreeUpdatePage from './professional-degree-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('ProfessionalDegree e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professionalDegreeUpdatePage: ProfessionalDegreeUpdatePage;
  let professionalDegreeComponentsPage: ProfessionalDegreeComponentsPage;
  let professionalDegreeDeleteDialog: ProfessionalDegreeDeleteDialog;

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

  it('should load ProfessionalDegrees', async () => {
    await navBarPage.getEntityPage('professional-degree');
    professionalDegreeComponentsPage = new ProfessionalDegreeComponentsPage();
    expect(await professionalDegreeComponentsPage.getTitle().getText()).to.match(/Professional Degrees/);
  });

  it('should load create ProfessionalDegree page', async () => {
    await professionalDegreeComponentsPage.clickOnCreateButton();
    professionalDegreeUpdatePage = new ProfessionalDegreeUpdatePage();
    expect(await professionalDegreeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchProfessionalDegree.home.createOrEditLabel/
    );
  });

  it('should create and save ProfessionalDegrees', async () => {
    const nbButtonsBeforeCreate = await professionalDegreeComponentsPage.countDeleteButtons();

    await professionalDegreeUpdatePage.setNameInput('name');
    expect(await professionalDegreeUpdatePage.getNameInput()).to.match(/name/);
    await professionalDegreeUpdatePage.setInstituteInput('institute');
    expect(await professionalDegreeUpdatePage.getInstituteInput()).to.match(/institute/);
    await professionalDegreeUpdatePage.setCountryInput('country');
    expect(await professionalDegreeUpdatePage.getCountryInput()).to.match(/country/);
    await professionalDegreeUpdatePage.setEnrollmentYearInput('5');
    expect(await professionalDegreeUpdatePage.getEnrollmentYearInput()).to.eq('5');
    await professionalDegreeUpdatePage.setPassingYearInput('5');
    expect(await professionalDegreeUpdatePage.getPassingYearInput()).to.eq('5');
    await professionalDegreeUpdatePage.doctorSelectLastOption();
    await waitUntilDisplayed(professionalDegreeUpdatePage.getSaveButton());
    await professionalDegreeUpdatePage.save();
    await waitUntilHidden(professionalDegreeUpdatePage.getSaveButton());
    expect(await professionalDegreeUpdatePage.getSaveButton().isPresent()).to.be.false;

    await professionalDegreeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await professionalDegreeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ProfessionalDegree', async () => {
    await professionalDegreeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await professionalDegreeComponentsPage.countDeleteButtons();
    await professionalDegreeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    professionalDegreeDeleteDialog = new ProfessionalDegreeDeleteDialog();
    expect(await professionalDegreeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchProfessionalDegree.delete.question/
    );
    await professionalDegreeDeleteDialog.clickOnConfirmButton();

    await professionalDegreeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await professionalDegreeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
