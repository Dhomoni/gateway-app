/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import IndicationComponentsPage from './indication.page-object';
import { IndicationDeleteDialog } from './indication.page-object';
import IndicationUpdatePage from './indication-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Indication e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let indicationUpdatePage: IndicationUpdatePage;
  let indicationComponentsPage: IndicationComponentsPage;
  let indicationDeleteDialog: IndicationDeleteDialog;

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

  it('should load Indications', async () => {
    await navBarPage.getEntityPage('indication');
    indicationComponentsPage = new IndicationComponentsPage();
    expect(await indicationComponentsPage.getTitle().getText()).to.match(/Indications/);
  });

  it('should load create Indication page', async () => {
    await indicationComponentsPage.clickOnCreateButton();
    indicationUpdatePage = new IndicationUpdatePage();
    expect(await indicationUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchIndication.home.createOrEditLabel/);
  });

  it('should create and save Indications', async () => {
    const nbButtonsBeforeCreate = await indicationComponentsPage.countDeleteButtons();

    await indicationUpdatePage.setNameInput('name');
    expect(await indicationUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(indicationUpdatePage.getSaveButton());
    await indicationUpdatePage.save();
    await waitUntilHidden(indicationUpdatePage.getSaveButton());
    expect(await indicationUpdatePage.getSaveButton().isPresent()).to.be.false;

    await indicationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await indicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Indication', async () => {
    await indicationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await indicationComponentsPage.countDeleteButtons();
    await indicationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    indicationDeleteDialog = new IndicationDeleteDialog();
    expect(await indicationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchIndication.delete.question/);
    await indicationDeleteDialog.clickOnConfirmButton();

    await indicationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await indicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
