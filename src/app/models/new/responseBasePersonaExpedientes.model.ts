import {ResponseBaseModel} from './responseBase.model';
import {PersonaExpedienteModel} from './persona-expediente.model';

export class ResponseBasePersonaExpedientesModel extends ResponseBaseModel {
  personaExpedientes: PersonaExpedienteModel;
}
