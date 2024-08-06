import { IEventEmitter } from './interface/EventEmitter.interface';
import { EventType } from './constant/EventType';
import { getWebEventEmitter } from '@/factories/WebEventEmitter.factory';

export class EventEmitter implements IEventEmitter {
  _self!: IEventEmitter;

  get self(): IEventEmitter {
    if (!this._self) {
      // TODO 识别不同平台
      const webEventEmitter = getWebEventEmitter();
      this._self = webEventEmitter;
    }
    return this._self;
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
