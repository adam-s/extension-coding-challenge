import { Controller } from '../common/mvc/controller';
import {
  Command,
  MessageFromBackground,
  MessageFromContent,
} from '../common/types';
import { assertNever } from '../common/utils';
import { ContentModel, ModelProps } from './content.model';

interface Service<T> {
  model: ContentModel<T>;
}

export class ContentController<T> extends Controller {
  constructor(public service: Service<T>) {
    super();
    this._wireListeners();
  }

  protected postMessage(message: MessageFromContent) {
    chrome.runtime.sendMessage(message);
  }

  private _wireListeners() {
    chrome.runtime.onMessage.addListener(
      (message: MessageFromBackground, _sender, sendResponse) => {
        console.log(message);
        // Only accept messages from this extension for security
        switch (message.type) {
          case 'info':
            this._handleInfo(sendResponse);
            break;
          case 'command':
            this._handleCommand(message.command);
            break;
          default:
            assertNever(message);
        }
        return true;
      },
    );
  }

  private _handleInfo(sendResponse: (response: ModelProps<T>) => void) {
    console.log(this.service.model.getAll());
    sendResponse(this.service.model.getAll());
  }

  // This should be abstract
  private _handleCommand(command: Command) {
    switch (command.action) {
      case 'executeTypeToScreen':
        this._writeToScreen();
        break;
      default:
        assertNever(command.action);
    }
  }

  private _writeToScreen() {}
}
