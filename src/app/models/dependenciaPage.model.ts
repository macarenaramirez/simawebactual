import {Dependencia} from './dependencia.model';
import {Pageable} from './pageable.model';
import {Sort} from './sort.model';

export interface DependenciaPage {
  content: Array<Dependencia>;
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
