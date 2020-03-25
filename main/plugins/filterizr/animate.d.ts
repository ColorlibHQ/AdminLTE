declare class Animator {
    static animate(node: HTMLElement, targetStyles: object): Promise<void>;
    private static process;
}
declare const _default: typeof Animator.animate;
export default _default;
