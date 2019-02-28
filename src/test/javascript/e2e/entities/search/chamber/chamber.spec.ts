/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ChamberComponentsPage from './chamber.page-object';
import { ChamberDeleteDialog } from './chamber.page-object';
import ChamberUpdatePage from './chamber-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Chamber e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chamberUpdatePage: ChamberUpdatePage;
  let chamberComponentsPage: ChamberComponentsPage;
  let chamberDeleteDialog: ChamberDeleteDialog;

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

  it('should load Chambers', async () => {
    await navBarPage.getEntityPage('chamber');
    chamberComponentsPage = new ChamberComponentsPage();
    expect(await chamberComponentsPage.getTitle().getText()).to.match(/Chambers/);
  });

  it('should load create Chamber page', async () => {
    await chamberComponentsPage.clickOnCreateButton();
    chamberUpdatePage = new ChamberUpdatePage();
    expect(await chamberUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchChamber.home.createOrEditLabel/);
  });

  it('should create and save Chambers', async () => {
    const nbButtonsBeforeCreate = await chamberComponentsPage.countDeleteButtons();

    await chamberUpdatePage.setAddressInput('address');
    expect(await chamberUpdatePage.getAddressInput()).to.match(/address/);
    await chamberUpdatePage.setPhoneInput('phone');
    expect(await chamberUpdatePage.getPhoneInput()).to.match(/phone/);
    await chamberUpdatePage.setFeeInput('5');
    expect(await chamberUpdatePage.getFeeInput()).to.eq('5');
    const selectedIsSuspended = await chamberUpdatePage.getIsSuspendedInput().isSelected();
    if (selectedIsSuspended) {
      await chamberUpdatePage.getIsSuspendedInput().click();
      expect(await chamberUpdatePage.getIsSuspendedInput().isSelected()).to.be.false;
    } else {
      await chamberUpdatePage.getIsSuspendedInput().click();
      expect(await chamberUpdatePage.getIsSuspendedInput().isSelected()).to.be.true;
    }
    await chamberUpdatePage.setNoticeInput('notice');
    expect(await chamberUpdatePage.getNoticeInput()).to.match(/notice/);
    await chamberUpdatePage.setAppointmentLimitInput('5');
    expect(await chamberUpdatePage.getAppointmentLimitInput()).to.eq('5');
    await chamberUpdatePage.setAdviceDurationInMinuteInput('5');
    expect(await chamberUpdatePage.getAdviceDurationInMinuteInput()).to.eq('5');
    await chamberUpdatePage.doctorSelectLastOption();
    await waitUntilDisplayed(chamberUpdatePage.getSaveButton());
    await chamberUpdatePage.save();
    await waitUntilHidden(chamberUpdatePage.getSaveButton());
    expect(await chamberUpdatePage.getSaveButton().isPresent()).to.be.false;

    await chamberComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await chamberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Chamber', async () => {
    await chamberComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await chamberComponentsPage.countDeleteButtons();
    await chamberComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    chamberDeleteDialog = new ChamberDeleteDialog();
    expect(await chamberDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchChamber.delete.question/);
    await chamberDeleteDialog.clickOnConfirmButton();

    await chamberComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await chamberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
