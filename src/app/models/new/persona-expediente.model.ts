import { CabeceraExpedienteModel } from "./cabecera-expediente.model";
import { DetalleExpedienteModel } from "./detalle-expediente.model";

export class PersonaExpedienteModel {
    persona: CabeceraExpedienteModel;
    expedientes: DetalleExpedienteModel[];

}
