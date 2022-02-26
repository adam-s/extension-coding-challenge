import { waitForElement } from '../../common/utils';
import { ContentController } from '../content.controller';
import { NasaProps } from './nasa.model';
import { NasaService } from './nasa.service';

export class NasaController extends ContentController<NasaProps> {
  static build() {
    return new NasaController(NasaService.build());
  }
  constructor(service: NasaService) {
    super(service);
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
}
