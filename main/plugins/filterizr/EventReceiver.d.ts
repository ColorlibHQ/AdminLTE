import { Destructible } from './types/interfaces';
declare type Receiver = NodeListOf<Element> | Element | Window;
export default class EventReceiver implements Destructible {
    private receiver;
    private eventDictionary;
    constructor(receiver: Receiver);
    on(eventType: string, eventHandler: EventListener): void;
    off(eventType: string): void;
    destroy(): void;
    private removeAllEvents;
}
export {};
