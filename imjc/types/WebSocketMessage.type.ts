import { EventType } from '../constant/EventType';

export class WebSocketMessage<T = Object> {
  event: EventType;
  payload: T;

  constructor(
    event: EventType,
    payload: T,
  ) {
    this.event = event;
    this.payload = payload;
  }
};