import { PopupView, InputFields } from './popup.view';

export class PopupController {
  static build() {
    const view = new PopupView();
    return new PopupController(view);
  }

  constructor(private _view: PopupView) {
    this._view.bindSubmit(this.handleSubmit.bind(this));

    this.rehydrate();
  }

  rehydrate() {
    // Get data and populate the text fields
    const formInfo = this._view.formInfo();
    formInfo.fields.forEach((field) => {
      chrome.storage.local.get([field], (result) => {
        if (result[field]) {
          this._view.updateField(field, result[field]);
        }
      });
    });
  }

  handleSubmit(data: InputFields) {
    // Save to local storage
    for (const [key, value] of Object.entries(data)) {
      chrome.storage.local.set({ [key]: value });
    }
  }
}
