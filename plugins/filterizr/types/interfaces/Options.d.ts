import { BaseOptions } from './BaseOptions';
import ActiveFilter from '../../ActiveFilter';
export interface Options extends BaseOptions {
    filter: ActiveFilter;
}
