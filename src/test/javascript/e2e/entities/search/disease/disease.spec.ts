/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DiseaseComponentsPage from './disease.page-object';
import { DiseaseDeleteDialog } from './disease.page-object';
import DiseaseUpdatePage from './disease-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Disease e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let diseaseUpdatePage: DiseaseUpdatePage;
  let diseaseComponentsPage: DiseaseComponentsPage;
  let diseaseDeleteDialog: DiseaseDeleteDialog;

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

  it('should load Diseases', async () => {
    await navBarPage.getEntityPage('disease');
    diseaseComponentsPage = new DiseaseComponentsPage();
    expect(await diseaseComponentsPage.getTitle().getText()).to.match(/Diseases/);
  });

  it('should load create Disease page', async () => {
    await diseaseComponentsPage.clickOnCreateButton();
    diseaseUpdatePage = new DiseaseUpdatePage();
    expect(await diseaseUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchDisease.home.createOrEditLabel/);
  });

  it('should create and save Diseases', async () => {
    const nbButtonsBeforeCreate = await diseaseComponentsPage.countDeleteButtons();

    await diseaseUpdatePage.setMedicalNameInput('medicalName');
    expect(await diseaseUpdatePage.getMedicalNameInput()).to.match(/medicalName/);
    await diseaseUpdatePage.setGeneralNameInput('generalName');
    expect(await diseaseUpdatePage.getGeneralNameInput()).to.match(/generalName/);
    await diseaseUpdatePage.setSymptomsInput('symptoms');
    expect(await diseaseUpdatePage.getSymptomsInput()).to.match(/symptoms/);
    await diseaseUpdatePage.deptSelectLastOption();
    await waitUntilDisplayed(diseaseUpdatePage.getSaveButton());
    await diseaseUpdatePage.save();
    await waitUntilHidden(diseaseUpdatePage.getSaveButton());
    expect(await diseaseUpdatePage.getSaveButton().isPresent()).to.be.false;

    await diseaseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await diseaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Disease', async () => {
    await diseaseComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await diseaseComponentsPage.countDeleteButtons();
    await diseaseComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    diseaseDeleteDialog = new DiseaseDeleteDialog();
    expect(await diseaseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchDisease.delete.question/);
    await diseaseDeleteDialog.clickOnConfirmButton();

    await diseaseComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await diseaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
