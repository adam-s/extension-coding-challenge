import {
  IFormFields,
  validFormFieldName,
} from '../../common/utils/valid-form-field-names';
import './popup.scss';

declare global {
  interface FormData {
    entries: <T>() => Iterator<T>;
  }
  interface Document {
    fonts: FontFaceSet;
  }
}

interface FontFaceSet {
  add(font: FontFace): void;
}

export interface InputFields {
  documentUri?: string;
  inputText?: string;
}

export interface FormInfo {
  fields: string[];
}

export class PopupView {
  private _form: HTMLFormElement;
  constructor() {
    this._importResources();

    this._form = document.getElementById('form') as HTMLFormElement;
  }

  private _importResources() {
    // Have to load fonts to get the local resource location id
    const font = new FontFace(
      'Roboto-Regular',
      "url('/common/fonts/Roboto/Roboto-Regular.ttf')",
    );
    document.fonts.add(font);
  }

  private _formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formFieldNames = ['documentUri', 'inputText'] as const;
    const inputFields = this._form.querySelectorAll('input');
    const data: IFormFields<typeof formFieldNames> = {
      documentUri: '',
      inputText: '',
    };
    inputFields.forEach((elem) => {
      const { value, name } = elem;
      if (validFormFieldName(formFieldNames, name)) {
        data[name] = value;
      }
    });
    return data;
  }

  public formInfo() {
    const info: FormInfo = {
      fields: [],
    };
    this._form.querySelectorAll('input').forEach((input: HTMLInputElement) => {
      const name = input.getAttribute('name');
      if (name) {
        info.fields.push(name);
      }
    });
    return info;
  }

  public updateField(name: string, value: string) {
    const input = this._form.querySelector(
      `[name="${name}"]`,
    ) as HTMLInputElement | null;
    if (input) {
      input.value = value;
    }
  }

  public bindSubmit(handler: (data: InputFields) => void) {
    this._form.addEventListener('submit', (event: SubmitEvent) => {
      const payload = this._formSubmit(event);
      handler(payload);
    });
  }
}
