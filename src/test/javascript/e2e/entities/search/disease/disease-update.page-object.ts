import { element, by, ElementFinder } from 'protractor';

export default class DiseaseUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchDisease.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  medicalNameInput: ElementFinder = element(by.css('input#disease-medicalName'));
  generalNameInput: ElementFinder = element(by.css('input#disease-generalName'));
  symptomsInput: ElementFinder = element(by.css('input#disease-symptoms'));
  deptSelect: ElementFinder = element(by.css('select#disease-dept'));

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

  async setSymptomsInput(symptoms) {
    await this.symptomsInput.sendKeys(symptoms);
  }

  async getSymptomsInput() {
    return this.symptomsInput.getAttribute('value');
  }

  async deptSelectLastOption() {
    await this.deptSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async deptSelectOption(option) {
    await this.deptSelect.sendKeys(option);
  }

  getDeptSelect() {
    return this.deptSelect;
  }

  async getDeptSelectedOption() {
    return this.deptSelect.element(by.css('option:checked')).getText();
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
