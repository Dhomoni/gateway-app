/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import SymptomComponentsPage from './symptom.page-object';
import { SymptomDeleteDialog } from './symptom.page-object';
import SymptomUpdatePage from './symptom-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Symptom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let symptomUpdatePage: SymptomUpdatePage;
  let symptomComponentsPage: SymptomComponentsPage;
  let symptomDeleteDialog: SymptomDeleteDialog;

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

  it('should load Symptoms', async () => {
    await navBarPage.getEntityPage('symptom');
    symptomComponentsPage = new SymptomComponentsPage();
    expect(await symptomComponentsPage.getTitle().getText()).to.match(/Symptoms/);
  });

  it('should load create Symptom page', async () => {
    await symptomComponentsPage.clickOnCreateButton();
    symptomUpdatePage = new SymptomUpdatePage();
    expect(await symptomUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchSymptom.home.createOrEditLabel/);
  });

  it('should create and save Symptoms', async () => {
    const nbButtonsBeforeCreate = await symptomComponentsPage.countDeleteButtons();

    await symptomUpdatePage.setNameInput('name');
    expect(await symptomUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(symptomUpdatePage.getSaveButton());
    await symptomUpdatePage.save();
    await waitUntilHidden(symptomUpdatePage.getSaveButton());
    expect(await symptomUpdatePage.getSaveButton().isPresent()).to.be.false;

    await symptomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await symptomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Symptom', async () => {
    await symptomComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await symptomComponentsPage.countDeleteButtons();
    await symptomComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    symptomDeleteDialog = new SymptomDeleteDialog();
    expect(await symptomDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchSymptom.delete.question/);
    await symptomDeleteDialog.clickOnConfirmButton();

    await symptomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await symptomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
