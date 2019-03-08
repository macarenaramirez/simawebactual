export interface MenuAndSubMenuModel {
  id: number;
  nombre: string;
  idpadre: number;
  permiso: string;
  routerlink: string;
  submenus: MenuAndSubMenuModel[];
}
