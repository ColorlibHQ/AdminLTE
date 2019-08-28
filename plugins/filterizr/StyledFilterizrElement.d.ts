import { Destructible } from './types/interfaces/Destructible';
import FilterizrOptions from './FilterizrOptions';
export default abstract class StyledFilterizrElement implements Destructible {
    protected options: FilterizrOptions;
    protected node: HTMLElement;
    constructor(node: HTMLElement, options: FilterizrOptions);
    destroy(): void;
    protected animate(targetStyles: object): Promise<void>;
    protected set(targetStyles: object): void;
    protected remove(propertyName: string): void;
    abstract initialize(): void | Promise<void>;
}
