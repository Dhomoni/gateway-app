import { element, by, ElementFinder } from 'protractor';

export default class ProfessionalDegreeUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchProfessionalDegree.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#professional-degree-name'));
  instituteInput: ElementFinder = element(by.css('input#professional-degree-institute'));
  countryInput: ElementFinder = element(by.css('input#professional-degree-country'));
  enrollmentYearInput: ElementFinder = element(by.css('input#professional-degree-enrollmentYear'));
  passingYearInput: ElementFinder = element(by.css('input#professional-degree-passingYear'));
  doctorSelect: ElementFinder = element(by.css('select#professional-degree-doctor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setInstituteInput(institute) {
    await this.instituteInput.sendKeys(institute);
  }

  async getInstituteInput() {
    return this.instituteInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setEnrollmentYearInput(enrollmentYear) {
    await this.enrollmentYearInput.sendKeys(enrollmentYear);
  }

  async getEnrollmentYearInput() {
    return this.enrollmentYearInput.getAttribute('value');
  }

  async setPassingYearInput(passingYear) {
    await this.passingYearInput.sendKeys(passingYear);
  }

  async getPassingYearInput() {
    return this.passingYearInput.getAttribute('value');
  }

  async doctorSelectLastOption() {
    await this.doctorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async doctorSelectOption(option) {
    await this.doctorSelect.sendKeys(option);
  }

  getDoctorSelect() {
    return this.doctorSelect;
  }

  async getDoctorSelectedOption() {
    return this.doctorSelect.element(by.css('option:checked')).getText();
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
