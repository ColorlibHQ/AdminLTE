import FilterizrOptions from '../FilterizrOptions';
import { Dictionary, Position } from '../types/interfaces';
export declare const makeInitialStyles: (options: FilterizrOptions) => object;
export declare const makeFilteringStyles: (targetPosition: Position, cssOptions: Dictionary) => object;
export declare const makeTransitionStyles: (index: number, options: FilterizrOptions) => object;
