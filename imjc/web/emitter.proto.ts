import { IEventEmitter } from '../interface/EventEmitter.interface';
import { EventType } from '../constant/EventType';

export default class EventEmitter implements IEventEmitter {
  constructor() {
    // this.context = context;
  }

  emit(event: EventType, ...args: Object[]): void {
    // this.context.eventHub.emit(event + '', ...args);
  }

  on(event: EventType, callback: (...args: Object[]) => void): void {
    // this.context.eventHub.on(event + '', callback);
  }

  off(event: EventType, callback?: (...args: Object[]) => void): void {
    // this.context.eventHub.off(event + '', callback);
  }
}
