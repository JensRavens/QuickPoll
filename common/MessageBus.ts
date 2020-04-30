import { Room } from "./room";

export interface MessageBusEventMap {
  "create-room": {
    payload: {};
    response: Room;
  };
  "update-room": {
    payload: { id: string; name?: string; options?: string[] };
    response: void;
  };
  "update-profile": {
    payload: { name?: string; email?: string };
    response: void;
  };
  "join-room": {
    payload: { id: string };
    response?: Room;
  };
  "room-updated": {
    payload: Room;
    response: void;
  };
  vote: {
    payload: { roomId: string; vote: string | undefined };
    response: void;
  };
  "reset-votes": {
    payload: { id: string };
    response: void;
  };
}

export type MessageBusEventName = Extract<keyof MessageBusEventMap, string>;

interface Subscription {
  unsubscribe: () => void;
}

export class MessageBus {
  private socket: any;

  constructor(socket: unknown) {
    this.socket = socket;
  }

  on<
    Event extends MessageBusEventName,
    Payload = MessageBusEventMap[Event]["payload"],
    Response = MessageBusEventMap[Event]["response"]
  >(event: Event, callback: (payload: Payload) => Response): Subscription {
    const handler: (
      payload: Payload,
      completion?: (res: Response) => void
    ) => void = (payload, completion) => {
      const result = callback(payload);
      if (completion) {
        completion(result);
      }
    };
    this.socket.on(event, handler);
    return {
      unsubscribe: () => {
        this.socket.off(event, handler);
      },
    };
  }

  emit<Event extends MessageBusEventName>(
    event: Event,
    payload: MessageBusEventMap[Event]["payload"]
  ): void {
    this.socket.emit(event, payload);
  }

  async call<Event extends MessageBusEventName>(
    event: Event,
    payload: MessageBusEventMap[Event]["payload"]
  ): Promise<MessageBusEventMap[Event]["response"]> {
    return new Promise((res) => {
      this.socket.emit(event, payload, res);
    });
  }
}
