import { SucursalModel } from "./sucursal.model";

export class PatenteModel {

    crmc: number;
    xapellRazon: string;
    xnombr: string;
    nroPatenteComercial: number;
    cantidadSucursal: number;
    nzona: number;
    nmanzana: number;
    nlote: number;
    npisoCatas: string;
    ndpto: number;
    calleUbicPrincipal: string;
    calleUbicSecundaria: string;
    nroCasa: number;
    codigoActividadPrincipal: number;
    descriActividadPrincipal: string;
    ejercicioFiscal: number;
    anticipo: number;
    sucursales: SucursalModel[];

}
