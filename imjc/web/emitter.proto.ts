import { IEventEmitter } from '../interface/EventEmitter.interface';
import { EventType as EmitterEventType } from '../constant/EventType';
import mitt, { Emitter, EventType } from 'mitt';

const emitterImpl: Emitter<Record<EventType, Array<Object>>> = mitt();
const callbackMap: Map<Function, Function> = new Map();

export default class WebEventEmitter implements IEventEmitter {
  
  constructor() {
  }

  emit(event: EmitterEventType, ...args: Object[]): void {
    emitterImpl.emit(event + '', args);
  }

  on(event: EmitterEventType, callback: (...args: Object[]) => void): void {
    const wrappedCallback = (e: Array<Object>) => callback(...e);
    emitterImpl.on(event + '', wrappedCallback);
    callbackMap.set(callback, wrappedCallback);
  }

  off(event: EmitterEventType, callback?: (...args: Object[]) => void): void {
    if (callback !== undefined) {
      if (callbackMap.has(callback)) {
        const wrappedCallback = callbackMap.get(callback) as (e: Array<Object>) => void;
        emitterImpl.off(event + '', wrappedCallback);
      }
    } else {
      emitterImpl.off(event + '');
    }
  }
}
