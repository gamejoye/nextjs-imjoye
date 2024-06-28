import { EventType } from '../constant/EventType';

export interface IEventEmitter {
  emit(event: EventType, ...args: Object[]): void;

  on(event: EventType, callback: Function): void;

  off(event: EventType, callback?: Function): void;
}