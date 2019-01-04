/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import WeeklyVisitingHourComponentsPage from './weekly-visiting-hour.page-object';
import { WeeklyVisitingHourDeleteDialog } from './weekly-visiting-hour.page-object';
import WeeklyVisitingHourUpdatePage from './weekly-visiting-hour-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('WeeklyVisitingHour e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let weeklyVisitingHourUpdatePage: WeeklyVisitingHourUpdatePage;
  let weeklyVisitingHourComponentsPage: WeeklyVisitingHourComponentsPage;
  let weeklyVisitingHourDeleteDialog: WeeklyVisitingHourDeleteDialog;

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

  it('should load WeeklyVisitingHours', async () => {
    await navBarPage.getEntityPage('weekly-visiting-hour');
    weeklyVisitingHourComponentsPage = new WeeklyVisitingHourComponentsPage();
    expect(await weeklyVisitingHourComponentsPage.getTitle().getText()).to.match(/Weekly Visiting Hours/);
  });

  it('should load create WeeklyVisitingHour page', async () => {
    await weeklyVisitingHourComponentsPage.clickOnCreateButton();
    weeklyVisitingHourUpdatePage = new WeeklyVisitingHourUpdatePage();
    expect(await weeklyVisitingHourUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchWeeklyVisitingHour.home.createOrEditLabel/
    );
  });

  it('should create and save WeeklyVisitingHours', async () => {
    const nbButtonsBeforeCreate = await weeklyVisitingHourComponentsPage.countDeleteButtons();

    await weeklyVisitingHourUpdatePage.weekDaySelectLastOption();
    await weeklyVisitingHourUpdatePage.setStartHourInput('5');
    expect(await weeklyVisitingHourUpdatePage.getStartHourInput()).to.eq('5');
    await weeklyVisitingHourUpdatePage.setStartMinuteInput('5');
    expect(await weeklyVisitingHourUpdatePage.getStartMinuteInput()).to.eq('5');
    await weeklyVisitingHourUpdatePage.setEndHourInput('5');
    expect(await weeklyVisitingHourUpdatePage.getEndHourInput()).to.eq('5');
    await weeklyVisitingHourUpdatePage.setEndMinuteInput('5');
    expect(await weeklyVisitingHourUpdatePage.getEndMinuteInput()).to.eq('5');
    await weeklyVisitingHourUpdatePage.chamberSelectLastOption();
    await waitUntilDisplayed(weeklyVisitingHourUpdatePage.getSaveButton());
    await weeklyVisitingHourUpdatePage.save();
    await waitUntilHidden(weeklyVisitingHourUpdatePage.getSaveButton());
    expect(await weeklyVisitingHourUpdatePage.getSaveButton().isPresent()).to.be.false;

    await weeklyVisitingHourComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await weeklyVisitingHourComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last WeeklyVisitingHour', async () => {
    await weeklyVisitingHourComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await weeklyVisitingHourComponentsPage.countDeleteButtons();
    await weeklyVisitingHourComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    weeklyVisitingHourDeleteDialog = new WeeklyVisitingHourDeleteDialog();
    expect(await weeklyVisitingHourDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dhomoniApp.searchWeeklyVisitingHour.delete.question/
    );
    await weeklyVisitingHourDeleteDialog.clickOnConfirmButton();

    await weeklyVisitingHourComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await weeklyVisitingHourComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
