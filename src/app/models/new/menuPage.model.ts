import {Pageable} from './pageable.model';
import {Sort} from './sort.model';
import {MenuForm} from './menuForm.model';

export interface MenuPage {
  content: Array<MenuForm>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  sort: Sort;
  size: number;
  number: number;
}
