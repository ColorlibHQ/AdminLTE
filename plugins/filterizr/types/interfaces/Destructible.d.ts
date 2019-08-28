export interface Destructible {
    destroy(): void | Promise<void>;
}
