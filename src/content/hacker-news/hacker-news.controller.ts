import { waitForElement } from '../../common/utils';
import { ContentController } from '../content.controller';
import { HackerNewsProps } from './hacker-news.model';
import { HackerNewsService } from './hacker-news.service';

export class HackerNewsController extends ContentController<HackerNewsProps> {
  static build() {
    return new HackerNewsController(HackerNewsService.build());
  }
  constructor(service: HackerNewsService) {
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
