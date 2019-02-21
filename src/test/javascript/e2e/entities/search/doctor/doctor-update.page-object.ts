import { element, by, ElementFinder } from 'protractor';

export default class DoctorUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchDoctor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  registrationIdInput: ElementFinder = element(by.css('input#doctor-registrationId'));
  firstNameInput: ElementFinder = element(by.css('input#doctor-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#doctor-lastName'));
  emailInput: ElementFinder = element(by.css('input#doctor-email'));
  phoneInput: ElementFinder = element(by.css('input#doctor-phone'));
  licenceNumberInput: ElementFinder = element(by.css('input#doctor-licenceNumber'));
  nationalIdInput: ElementFinder = element(by.css('input#doctor-nationalId'));
  passportNoInput: ElementFinder = element(by.css('input#doctor-passportNo'));
  typeSelect: ElementFinder = element(by.css('select#doctor-type'));
  designationInput: ElementFinder = element(by.css('input#doctor-designation'));
  instituteInput: ElementFinder = element(by.css('input#doctor-institute'));
  specialityInput: ElementFinder = element(by.css('input#doctor-speciality'));
  descriptionInput: ElementFinder = element(by.css('textarea#doctor-description'));
  addressInput: ElementFinder = element(by.css('input#doctor-address'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  activatedInput: ElementFinder = element(by.css('input#doctor-activated'));
  medicalDepartmentSelect: ElementFinder = element(by.css('select#doctor-medicalDepartment'));

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

  async setLicenceNumberInput(licenceNumber) {
    await this.licenceNumberInput.sendKeys(licenceNumber);
  }

  async getLicenceNumberInput() {
    return this.licenceNumberInput.getAttribute('value');
  }

  async setNationalIdInput(nationalId) {
    await this.nationalIdInput.sendKeys(nationalId);
  }

  async getNationalIdInput() {
    return this.nationalIdInput.getAttribute('value');
  }

  async setPassportNoInput(passportNo) {
    await this.passportNoInput.sendKeys(passportNo);
  }

  async getPassportNoInput() {
    return this.passportNoInput.getAttribute('value');
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
  async setDesignationInput(designation) {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput() {
    return this.designationInput.getAttribute('value');
  }

  async setInstituteInput(institute) {
    await this.instituteInput.sendKeys(institute);
  }

  async getInstituteInput() {
    return this.instituteInput.getAttribute('value');
  }

  async setSpecialityInput(speciality) {
    await this.specialityInput.sendKeys(speciality);
  }

  async getSpecialityInput() {
    return this.specialityInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
