import { IEventEmitter } from './interface/EventEmitter.interface';
import { EventType } from './constant/EventType';

export class EventEmitter {
  self!: IEventEmitter;

  init(self: IEventEmitter) {
    this.self = self;
  }

  emit(event: EventType, ...args: Object[]) {
    this.self.emit(event, ...args);
  }

  on(event: EventType, callback: Function) {
    this.self.on(event, callback);
  }

  off(event: EventType, callback?: Function) {
    this.self.off(event, callback);
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
