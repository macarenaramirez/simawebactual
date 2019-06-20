import {ResponseBaseModel} from './responseBase.model';
import {PatenteModel} from './patente.model';

export class ResponseBasePatenteModel extends ResponseBaseModel {
  data: PatenteModel;
}
