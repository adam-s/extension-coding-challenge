import { waitForElement } from '../../common/utils';
import { ContentController } from '../content.controller';
import { GoogleDocsProps } from './google-docs.model';
import { GoogleDocsService } from './google-docs.service';
import { GoogleDocsView } from './google-docs.view';

export class GoogleDocsController extends ContentController<GoogleDocsProps> {
  static build() {
    return new GoogleDocsController(
      GoogleDocsService.build(),
      GoogleDocsView.build(),
    );
  }

  private _view: GoogleDocsView;

  constructor(service: GoogleDocsService, view: GoogleDocsView) {
    super(service);
    this._view = view;
    this._view.bindOnClick(this.handleClick.bind(this));

    (async () => {
      await waitForElement('body');
      this.postMessage({
        type: 'init',
        data: {
          id: this.service.model.get('id'),
          url: this.service.model.get('url'),
        },
      });
    })();
  }

  public handleClick() {
    // Get values from storage
    const FIELD = 'inputText';
    chrome.storage.local.get([FIELD], (result) => {
      if (result[FIELD]) {
        this._view.typeText(result[FIELD]);
      }
    });
  }
}
