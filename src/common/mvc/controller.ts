import { EventDispatcher } from '../utils/event-dispatcher';

export class Controller {
  public events: EventDispatcher = new EventDispatcher();
  get on() {
    return this.events.on.bind(this.events);
  }

  get emit() {
    return this.events.emit.bind(this.events);
  }

  get off() {
    return this.events.emit.bind(this.events);
  }

  get once() {
    return this.events.emit.bind(this.events);
  }
}
