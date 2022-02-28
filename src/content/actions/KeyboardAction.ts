import { charRegex } from '../../common/utils/char-regex';
import { delay } from '../../common/utils/utils';

export class KeyboardAction {
  constructor(private _actionTarget: HTMLElement | Document | null) {
    if (!this._actionTarget)
      throw new Error('Action target is required for Keyboard Actions');
  }

  public static codeFromKey(key: string): number {
    if (key.match(charRegex())?.length !== 1) {
      throw new Error('Not valid character');
    }
    return key.charCodeAt(0);
  }

  public static keyFromCode(keyCode: number): string {
    if (keyCode < 0 || keyCode > 65535) {
      throw new Error('Not valid character keyCode');
    }
    return String.fromCharCode(keyCode);
  }

  public keyPress(keyCode: number | string): void {
    if (!this._actionTarget) return;

    let options: { keyCode: number; key: string };
    if (typeof keyCode === 'number') {
      options = {
        keyCode,
        key: KeyboardAction.keyFromCode(keyCode),
      };
    } else {
      options = {
        keyCode: KeyboardAction.codeFromKey(keyCode),
        key: keyCode,
      };
    }
    const press = new KeyboardEvent('keypress', options);
    this._actionTarget.dispatchEvent(press);
  }

  public async typeString(str: string): Promise<void> {
    const delayKeyPress = delay(this.keyPress.bind(this), 100, 300);
    for await (const key of str.split('')) {
      await delayKeyPress(key);
    }
  }
}
