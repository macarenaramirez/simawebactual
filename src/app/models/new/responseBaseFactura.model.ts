import {ResponseBaseModel} from './responseBase.model';
import {FacturaModel} from './factura.model';

export class ResponseBaseFacturaModel extends ResponseBaseModel {
  facturas: FacturaModel;
}
