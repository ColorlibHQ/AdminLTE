/**
 * Modified version of Jake Gordon's Bin Packing algorithm used for Filterizr's 'packed' layout
 * @see {@link https://github.com/jakesgordon/bin-packing}
 */
interface PackerRoot {
    x: number;
    y: number;
    w: number;
    h?: number;
    used?: boolean;
    down?: PackerRoot;
    right?: PackerRoot;
}
interface PackerBlock {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    fit?: PackerRoot | void;
}
export default class Packer {
    root: PackerRoot;
    constructor(w: number);
    init(w: number): void;
    fit(blocks: PackerBlock[]): void;
    findNode(root: PackerRoot, w: number, h: number): PackerRoot | void;
    splitNode(node: PackerRoot, w: number, h: number): PackerRoot;
    growDown(w: number, h: number): PackerRoot | void;
}
export {};
