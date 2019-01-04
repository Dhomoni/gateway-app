import { element, by, ElementFinder } from 'protractor';

export default class PatientUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchPatient.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  registrationIdInput: ElementFinder = element(by.css('input#patient-registrationId'));
  firstNameInput: ElementFinder = element(by.css('input#patient-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#patient-lastName'));
  emailInput: ElementFinder = element(by.css('input#patient-email'));
  phoneInput: ElementFinder = element(by.css('input#patient-phone'));
  sexSelect: ElementFinder = element(by.css('select#patient-sex'));
  birthTimestampInput: ElementFinder = element(by.css('input#patient-birthTimestamp'));
  bloodGroupSelect: ElementFinder = element(by.css('select#patient-bloodGroup'));
  weightInKGInput: ElementFinder = element(by.css('input#patient-weightInKG'));
  heightInInchInput: ElementFinder = element(by.css('input#patient-heightInInch'));
  addressInput: ElementFinder = element(by.css('input#patient-address'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  activatedInput: ElementFinder = element(by.css('input#patient-activated'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRegistrationIdInput(registrationId) {
    await this.registrationIdInput.sendKeys(registrationId);
  }

  async getRegistrationIdInput() {
    return this.registrationIdInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setSexSelect(sex) {
    await this.sexSelect.sendKeys(sex);
  }

  async getSexSelect() {
    return this.sexSelect.element(by.css('option:checked')).getText();
  }

  async sexSelectLastOption() {
    await this.sexSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setBirthTimestampInput(birthTimestamp) {
    await this.birthTimestampInput.sendKeys(birthTimestamp);
  }

  async getBirthTimestampInput() {
    return this.birthTimestampInput.getAttribute('value');
  }

  async setBloodGroupSelect(bloodGroup) {
    await this.bloodGroupSelect.sendKeys(bloodGroup);
  }

  async getBloodGroupSelect() {
    return this.bloodGroupSelect.element(by.css('option:checked')).getText();
  }

  async bloodGroupSelectLastOption() {
    await this.bloodGroupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setWeightInKGInput(weightInKG) {
    await this.weightInKGInput.sendKeys(weightInKG);
  }

  async getWeightInKGInput() {
    return this.weightInKGInput.getAttribute('value');
  }

  async setHeightInInchInput(heightInInch) {
    await this.heightInInchInput.sendKeys(heightInInch);
  }

  async getHeightInInchInput() {
    return this.heightInInchInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
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
