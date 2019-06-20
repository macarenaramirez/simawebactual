import {ResponseBaseModel} from './responseBase.model';
import {PersonaModel} from './persona.model';

export class ResponseBasePersonaModel extends ResponseBaseModel {
  persona: PersonaModel;
}
