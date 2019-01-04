import { element, by, ElementFinder } from 'protractor';

export default class WeeklyVisitingHourUpdatePage {
  pageTitle: ElementFinder = element(by.id('dhomoniApp.searchWeeklyVisitingHour.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  weekDaySelect: ElementFinder = element(by.css('select#weekly-visiting-hour-weekDay'));
  startHourInput: ElementFinder = element(by.css('input#weekly-visiting-hour-startHour'));
  startMinuteInput: ElementFinder = element(by.css('input#weekly-visiting-hour-startMinute'));
  endHourInput: ElementFinder = element(by.css('input#weekly-visiting-hour-endHour'));
  endMinuteInput: ElementFinder = element(by.css('input#weekly-visiting-hour-endMinute'));
  chamberSelect: ElementFinder = element(by.css('select#weekly-visiting-hour-chamber'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWeekDaySelect(weekDay) {
    await this.weekDaySelect.sendKeys(weekDay);
  }

  async getWeekDaySelect() {
    return this.weekDaySelect.element(by.css('option:checked')).getText();
  }

  async weekDaySelectLastOption() {
    await this.weekDaySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setStartHourInput(startHour) {
    await this.startHourInput.sendKeys(startHour);
  }

  async getStartHourInput() {
    return this.startHourInput.getAttribute('value');
  }

  async setStartMinuteInput(startMinute) {
    await this.startMinuteInput.sendKeys(startMinute);
  }

  async getStartMinuteInput() {
    return this.startMinuteInput.getAttribute('value');
  }

  async setEndHourInput(endHour) {
    await this.endHourInput.sendKeys(endHour);
  }

  async getEndHourInput() {
    return this.endHourInput.getAttribute('value');
  }

  async setEndMinuteInput(endMinute) {
    await this.endMinuteInput.sendKeys(endMinute);
  }

  async getEndMinuteInput() {
    return this.endMinuteInput.getAttribute('value');
  }

  async chamberSelectLastOption() {
    await this.chamberSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async chamberSelectOption(option) {
    await this.chamberSelect.sendKeys(option);
  }

  getChamberSelect() {
    return this.chamberSelect;
  }

  async getChamberSelectedOption() {
    return this.chamberSelect.element(by.css('option:checked')).getText();
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
