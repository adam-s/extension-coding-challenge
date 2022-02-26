import { HackerNewsModel } from './hacker-news.model';

export class HackerNewsService {
  static build() {
    const model = HackerNewsModel.build({ lastAccess: new Date() });
    return new HackerNewsService(model);
  }

  constructor(public model: HackerNewsModel) {
    console.log(this.model);
  }
}
