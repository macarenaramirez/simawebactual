import {Pageable} from './pageable.model';
import {Sort} from './sort.model';
import {Menu} from './menu.model';

export interface MenuPage {
  content: Array<Menu>;
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
