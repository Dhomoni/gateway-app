/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MedicalDepartmentComponentsPage from './medical-department.page-object';
import { MedicalDepartmentDeleteDialog } from './medical-department.page-object';
import MedicalDepartmentUpdatePage from './medical-department-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('MedicalDepartment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let medicalDepartmentUpdatePage: MedicalDepartmentUpdatePage;
  let medicalDepartmentComponentsPage: MedicalDepartmentComponentsPage;
  let medicalDepartmentDeleteDialog: MedicalDepartmentDeleteDialog;

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

  it('should load MedicalDepartments', async () => {
    await navBarPage.getEntityPage('medical-department');
    medicalDepartmentComponentsPage = new MedicalDepartmentComponentsPage();
    expect(await medicalDepartmentComponentsPage.getTitle().getText()).to.match(/Medical Departments/);
  });

  it('should load create MedicalDepartment page', async () => {
    await medicalDepartmentComponentsPage.clickOnCreateButton();
    medicalDepartmentUpdatePage = new MedicalDepartmentUpdatePage();
    expect(await medicalDepartmentUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchMedicalDepartment.home.createOrEditLabel/
    );
  });

  it('should create and save MedicalDepartments', async () => {
    const nbButtonsBeforeCreate = await medicalDepartmentComponentsPage.countDeleteButtons();

    await medicalDepartmentUpdatePage.setNameInput('name');
    expect(await medicalDepartmentUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(medicalDepartmentUpdatePage.getSaveButton());
    await medicalDepartmentUpdatePage.save();
    await waitUntilHidden(medicalDepartmentUpdatePage.getSaveButton());
    expect(await medicalDepartmentUpdatePage.getSaveButton().isPresent()).to.be.false;

    await medicalDepartmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await medicalDepartmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MedicalDepartment', async () => {
    await medicalDepartmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await medicalDepartmentComponentsPage.countDeleteButtons();
    await medicalDepartmentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    medicalDepartmentDeleteDialog = new MedicalDepartmentDeleteDialog();
    expect(await medicalDepartmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchMedicalDepartment.delete.question/
    );
    await medicalDepartmentDeleteDialog.clickOnConfirmButton();

    await medicalDepartmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await medicalDepartmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
