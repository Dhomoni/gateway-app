import { element, by, ElementFinder } from 'protractor';

export default class ChamberUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchChamber.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#chamber-address'));
  phoneInput: ElementFinder = element(by.css('input#chamber-phone'));
  feeInput: ElementFinder = element(by.css('input#chamber-fee'));
  isSuspendedInput: ElementFinder = element(by.css('input#chamber-isSuspended'));
  noticeInput: ElementFinder = element(by.css('input#chamber-notice'));
  appointmentLimitInput: ElementFinder = element(by.css('input#chamber-appointmentLimit'));
  adviceDurationInMinuteInput: ElementFinder = element(by.css('input#chamber-adviceDurationInMinute'));
  doctorSelect: ElementFinder = element(by.css('select#chamber-doctor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setFeeInput(fee) {
    await this.feeInput.sendKeys(fee);
  }

  async getFeeInput() {
    return this.feeInput.getAttribute('value');
  }

  getIsSuspendedInput() {
    return this.isSuspendedInput;
  }
  async setNoticeInput(notice) {
    await this.noticeInput.sendKeys(notice);
  }

  async getNoticeInput() {
    return this.noticeInput.getAttribute('value');
  }

  async setAppointmentLimitInput(appointmentLimit) {
    await this.appointmentLimitInput.sendKeys(appointmentLimit);
  }

  async getAppointmentLimitInput() {
    return this.appointmentLimitInput.getAttribute('value');
  }

  async setAdviceDurationInMinuteInput(adviceDurationInMinute) {
    await this.adviceDurationInMinuteInput.sendKeys(adviceDurationInMinute);
  }

  async getAdviceDurationInMinuteInput() {
    return this.adviceDurationInMinuteInput.getAttribute('value');
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
