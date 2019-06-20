import {ResponseBaseModel} from './responseBase.model';
import {PersonaModel} from './persona.model';

export class ResponseBasePersonasModel extends ResponseBaseModel {
  personas: PersonaModel[];
}
