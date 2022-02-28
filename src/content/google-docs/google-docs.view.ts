import { Modal } from '../components/modal';
import { KeyboardAction } from '../actions/KeyboardAction';

export class GoogleDocsView {
  static build() {
    return new GoogleDocsView();
  }

  private _content: HTMLDivElement;

  private _button: HTMLButtonElement;

  constructor() {
    this._button = document.createElement('button');
    this._button.classList.value = 'save form-button';
    this._button.textContent = 'Click to type text';

    this._content = document.createElement('div');
    this._content.append(this._button);

    new Modal(this._content, 0, 0);
  }

  public bindOnClick(handler: () => void) {
    this._button.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      handler();
    });
  }

  public typeText(text: string) {
    const target = (
      document.querySelector(
        '.docs-texteventtarget-iframe',
      ) as HTMLIFrameElement
    ).contentDocument;
    const keyboardAction = new KeyboardAction(target);

    keyboardAction.typeString(text);
  }
}
