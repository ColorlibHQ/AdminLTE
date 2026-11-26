/**
 * --------------------------------------------
 * @file AdminLTE card-widget.ts
 * @description Card widget for AdminLTE.
 * @license MIT
 * --------------------------------------------
 */
import { BaseComponent } from './base-component';
type Config = {
    animationSpeed: number;
    collapseTrigger: string;
    removeTrigger: string;
    maximizeTrigger: string;
};
declare class CardWidget extends BaseComponent {
    static get NAME(): string;
    static getInstance(element: Element | null | undefined): CardWidget | null;
    static getOrCreateInstance(element: HTMLElement, config?: Partial<Config>): CardWidget;
    _parent: HTMLElement | undefined;
    _config: Config;
    _removing: boolean;
    constructor(element: HTMLElement, config?: Partial<Config>);
    collapse(): void;
    expand(): void;
    remove(): void;
    toggle(): void;
    maximize(): void;
    minimize(): void;
    toggleMaximize(): void;
}
export default CardWidget;
