/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MedicineComponentsPage from './medicine.page-object';
import { MedicineDeleteDialog } from './medicine.page-object';
import MedicineUpdatePage from './medicine-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Medicine e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let medicineUpdatePage: MedicineUpdatePage;
  let medicineComponentsPage: MedicineComponentsPage;
  let medicineDeleteDialog: MedicineDeleteDialog;

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

  it('should load Medicines', async () => {
    await navBarPage.getEntityPage('medicine');
    medicineComponentsPage = new MedicineComponentsPage();
    expect(await medicineComponentsPage.getTitle().getText()).to.match(/Medicines/);
  });

  it('should load create Medicine page', async () => {
    await medicineComponentsPage.clickOnCreateButton();
    medicineUpdatePage = new MedicineUpdatePage();
    expect(await medicineUpdatePage.getPageTitle().getAttribute('id')).to.match(/dhomoniApp.searchMedicine.home.createOrEditLabel/);
  });

  it('should create and save Medicines', async () => {
    const nbButtonsBeforeCreate = await medicineComponentsPage.countDeleteButtons();

    await medicineUpdatePage.setTradeNameInput('tradeName');
    expect(await medicineUpdatePage.getTradeNameInput()).to.match(/tradeName/);
    await medicineUpdatePage.setUnitQuantityInput('unitQuantity');
    expect(await medicineUpdatePage.getUnitQuantityInput()).to.match(/unitQuantity/);
    await medicineUpdatePage.setGenericNameInput('genericName');
    expect(await medicineUpdatePage.getGenericNameInput()).to.match(/genericName/);
    await medicineUpdatePage.setChemicalNameInput('chemicalName');
    expect(await medicineUpdatePage.getChemicalNameInput()).to.match(/chemicalName/);
    await medicineUpdatePage.formulationSelectLastOption();
    await medicineUpdatePage.setManufacturerInput('manufacturer');
    expect(await medicineUpdatePage.getManufacturerInput()).to.match(/manufacturer/);
    await medicineUpdatePage.setMrpInput('5');
    expect(await medicineUpdatePage.getMrpInput()).to.eq('5');
    await medicineUpdatePage.setDoseAndAdminInput('doseAndAdmin');
    expect(await medicineUpdatePage.getDoseAndAdminInput()).to.match(/doseAndAdmin/);
    await medicineUpdatePage.setPreparationInput('preparation');
    expect(await medicineUpdatePage.getPreparationInput()).to.match(/preparation/);
    await medicineUpdatePage.setProductUrlInput('productUrl');
    expect(await medicineUpdatePage.getProductUrlInput()).to.match(/productUrl/);
    const selectedActive = await medicineUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await medicineUpdatePage.getActiveInput().click();
      expect(await medicineUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await medicineUpdatePage.getActiveInput().click();
      expect(await medicineUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    // medicineUpdatePage.indicationsSelectLastOption();
    await waitUntilDisplayed(medicineUpdatePage.getSaveButton());
    await medicineUpdatePage.save();
    await waitUntilHidden(medicineUpdatePage.getSaveButton());
    expect(await medicineUpdatePage.getSaveButton().isPresent()).to.be.false;

    await medicineComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await medicineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Medicine', async () => {
    await medicineComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await medicineComponentsPage.countDeleteButtons();
    await medicineComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    medicineDeleteDialog = new MedicineDeleteDialog();
    expect(await medicineDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dhomoniApp.searchMedicine.delete.question/);
    await medicineDeleteDialog.clickOnConfirmButton();

    await medicineComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await medicineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
