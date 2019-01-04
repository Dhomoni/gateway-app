import { element, by, ElementFinder } from 'protractor';

export default class MedicineUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchMedicine.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tradeNameInput: ElementFinder = element(by.css('input#medicine-tradeName'));
  unitQuantityInput: ElementFinder = element(by.css('input#medicine-unitQuantity'));
  genericNameInput: ElementFinder = element(by.css('input#medicine-genericName'));
  chemicalNameInput: ElementFinder = element(by.css('input#medicine-chemicalName'));
  typeSelect: ElementFinder = element(by.css('select#medicine-type'));
  manufacturerInput: ElementFinder = element(by.css('input#medicine-manufacturer'));
  mrpInput: ElementFinder = element(by.css('input#medicine-mrp'));
  indicationsInput: ElementFinder = element(by.css('input#medicine-indications'));
  doseAndAdminInput: ElementFinder = element(by.css('input#medicine-doseAndAdmin'));
  preparationInput: ElementFinder = element(by.css('input#medicine-preparation'));
  productUrlInput: ElementFinder = element(by.css('input#medicine-productUrl'));
  activeInput: ElementFinder = element(by.css('input#medicine-active'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTradeNameInput(tradeName) {
    await this.tradeNameInput.sendKeys(tradeName);
  }

  async getTradeNameInput() {
    return this.tradeNameInput.getAttribute('value');
  }

  async setUnitQuantityInput(unitQuantity) {
    await this.unitQuantityInput.sendKeys(unitQuantity);
  }

  async getUnitQuantityInput() {
    return this.unitQuantityInput.getAttribute('value');
  }

  async setGenericNameInput(genericName) {
    await this.genericNameInput.sendKeys(genericName);
  }

  async getGenericNameInput() {
    return this.genericNameInput.getAttribute('value');
  }

  async setChemicalNameInput(chemicalName) {
    await this.chemicalNameInput.sendKeys(chemicalName);
  }

  async getChemicalNameInput() {
    return this.chemicalNameInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setManufacturerInput(manufacturer) {
    await this.manufacturerInput.sendKeys(manufacturer);
  }

  async getManufacturerInput() {
    return this.manufacturerInput.getAttribute('value');
  }

  async setMrpInput(mrp) {
    await this.mrpInput.sendKeys(mrp);
  }

  async getMrpInput() {
    return this.mrpInput.getAttribute('value');
  }

  async setIndicationsInput(indications) {
    await this.indicationsInput.sendKeys(indications);
  }

  async getIndicationsInput() {
    return this.indicationsInput.getAttribute('value');
  }

  async setDoseAndAdminInput(doseAndAdmin) {
    await this.doseAndAdminInput.sendKeys(doseAndAdmin);
  }

  async getDoseAndAdminInput() {
    return this.doseAndAdminInput.getAttribute('value');
  }

  async setPreparationInput(preparation) {
    await this.preparationInput.sendKeys(preparation);
  }

  async getPreparationInput() {
    return this.preparationInput.getAttribute('value');
  }

  async setProductUrlInput(productUrl) {
    await this.productUrlInput.sendKeys(productUrl);
  }

  async getProductUrlInput() {
    return this.productUrlInput.getAttribute('value');
  }

  getActiveInput() {
    return this.activeInput;
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
