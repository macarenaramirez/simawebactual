import {ResponseBaseModel} from './responseBase.model';
import {MovimientoDetalleExpedienteModel} from './movimiento-detalle-expediente.model';

export class ResponseBaseMovimientosExpedientesModel extends ResponseBaseModel {
  movimientos: MovimientoDetalleExpedienteModel[];
}
