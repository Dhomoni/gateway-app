import { element, by, ElementFinder } from 'protractor';

export default class DiseaseUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchDisease.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  medicalNameInput: ElementFinder = element(by.css('input#disease-medicalName'));
  generalNameInput: ElementFinder = element(by.css('input#disease-generalName'));
  symptomsSelect: ElementFinder = element(by.css('select#disease-symptoms'));
  medicalDepartmentSelect: ElementFinder = element(by.css('select#disease-medicalDepartment'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMedicalNameInput(medicalName) {
    await this.medicalNameInput.sendKeys(medicalName);
  }

  async getMedicalNameInput() {
    return this.medicalNameInput.getAttribute('value');
  }

  async setGeneralNameInput(generalName) {
    await this.generalNameInput.sendKeys(generalName);
  }

  async getGeneralNameInput() {
    return this.generalNameInput.getAttribute('value');
  }

  async symptomsSelectLastOption() {
    await this.symptomsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async symptomsSelectOption(option) {
    await this.symptomsSelect.sendKeys(option);
  }

  getSymptomsSelect() {
    return this.symptomsSelect;
  }

  async getSymptomsSelectedOption() {
    return this.symptomsSelect.element(by.css('option:checked')).getText();
  }

  async medicalDepartmentSelectLastOption() {
    await this.medicalDepartmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async medicalDepartmentSelectOption(option) {
    await this.medicalDepartmentSelect.sendKeys(option);
  }

  getMedicalDepartmentSelect() {
    return this.medicalDepartmentSelect;
  }

  async getMedicalDepartmentSelectedOption() {
    return this.medicalDepartmentSelect.element(by.css('option:checked')).getText();
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
