export interface Menu {
  id: number;
  nombre: string;
  idpadre: number;
  permiso: string;
  routerlink: string;
  submenus: Menu[];
}
